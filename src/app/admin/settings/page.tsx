import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { SettingsForm } from "@/components/admin/SettingsForm";


export default async function SettingsPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  // Get all settings grouped by category
  const settings = await prisma.setting.findMany({
    orderBy: [{ category: "asc" }, { key: "asc" }]
  });

  // Group settings by category
  const settingsByCategory = settings.reduce((acc, setting) => {
    if (!acc[setting.category]) {
      acc[setting.category] = [];
    }
    acc[setting.category].push(setting);
    return acc;
  }, {} as Record<string, typeof settings>);

  // Seed default settings if none exist
  if (settings.length === 0) {
    const defaultSettings = [
      {
        key: "site_title",
        value: "Researchedit4u",
        description: "The main title of your website",
        category: "general"
      },
      {
        key: "site_description",
        value: "Premium academic editing and research support.",
        description: "A brief description of your website",
        category: "general"
      },
      {
        key: "contact_email",
        value: "support@researchedit4u.in",
        description: "Primary contact email address",
        category: "general"
      },
      {
        key: "posts_per_page",
        value: "10",
        description: "Number of posts to display per page",
        category: "blog"
      },
      {
        key: "allow_comments",
        value: "true",
        description: "Enable comments on blog posts",
        category: "blog"
      },
      {
        key: "maintenance_mode",
        value: "false",
        description: "Put the site in maintenance mode",
        category: "system"
      }
    ];

    await prisma.setting.createMany({
      data: defaultSettings
    });

    // Refetch settings after seeding
    const newSettings = await prisma.setting.findMany({
      orderBy: [{ category: "asc" }, { key: "asc" }]
    });

    newSettings.forEach(setting => {
      if (!settingsByCategory[setting.category]) {
        settingsByCategory[setting.category] = [];
      }
      settingsByCategory[setting.category].push(setting);
    });
  }

  return (
    <AdminLayout user={session.user}>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">
            Configure your website settings and preferences
          </p>
        </div>

        <div className="space-y-6">
          {Object.entries(settingsByCategory).map(([category, categorySettings]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="capitalize">{category} Settings</CardTitle>
                <CardDescription>
                  Configure {category} related options
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SettingsForm settings={categorySettings} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}