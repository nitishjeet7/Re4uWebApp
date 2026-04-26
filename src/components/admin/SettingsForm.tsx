"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Save } from "lucide-react";

interface Setting {
  id: string;
  key: string;
  value: string;
  description: string | null;
  category: string;
}

interface SettingsFormProps {
  settings: Setting[];
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>(
    settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {} as Record<string, string>)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Settings updated successfully");
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to update settings");
      }
    } catch (error) {
      toast.error("An error occurred while updating settings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const renderInput = (setting: Setting) => {
    const value = formData[setting.key] || "";

    // Boolean settings
    if (setting.value === "true" || setting.value === "false") {
      return (
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor={setting.key} className="capitalize">
              {setting.key.replace(/_/g, " ")}
            </Label>
            {setting.description && (
              <p className="text-sm text-gray-500 mt-1">
                {setting.description}
              </p>
            )}
          </div>
          <Switch
            id={setting.key}
            checked={value === "true"}
            onCheckedChange={(checked) => 
              handleInputChange(setting.key, checked ? "true" : "false")
            }
          />
        </div>
      );
    }

    // Multi-line text settings
    if (setting.key.includes("description") || setting.key.includes("content")) {
      return (
        <div>
          <Label htmlFor={setting.key} className="capitalize">
            {setting.key.replace(/_/g, " ")}
          </Label>
          {setting.description && (
            <p className="text-sm text-gray-500 mt-1 mb-2">
              {setting.description}
            </p>
          )}
          <Textarea
            id={setting.key}
            value={value}
            onChange={(e) => handleInputChange(setting.key, e.target.value)}
            rows={3}
          />
        </div>
      );
    }

    // Number settings
    if (setting.key.includes("per_page") || setting.key.includes("limit")) {
      return (
        <div>
          <Label htmlFor={setting.key} className="capitalize">
            {setting.key.replace(/_/g, " ")}
          </Label>
          {setting.description && (
            <p className="text-sm text-gray-500 mt-1 mb-2">
              {setting.description}
            </p>
          )}
          <Input
            id={setting.key}
            type="number"
            value={value}
            onChange={(e) => handleInputChange(setting.key, e.target.value)}
            min="1"
          />
        </div>
      );
    }

    // Default text input
    return (
      <div>
        <Label htmlFor={setting.key} className="capitalize">
          {setting.key.replace(/_/g, " ")}
        </Label>
        {setting.description && (
          <p className="text-sm text-gray-500 mt-1 mb-2">
            {setting.description}
          </p>
        )}
        <Input
          id={setting.key}
          value={value}
          onChange={(e) => handleInputChange(setting.key, e.target.value)}
          placeholder={`Enter ${setting.key.replace(/_/g, " ")}...`}
        />
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {settings.map((setting) => (
          <div key={setting.id}>
            {renderInput(setting)}
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          <Save className="mr-2 h-4 w-4" />
          {isLoading ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </form>
  );
}