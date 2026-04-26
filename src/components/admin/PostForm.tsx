"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { TiptapEditor } from "@/components/admin/TiptapEditor";
import { toast } from "sonner";
import { Save, Eye, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Post {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  coverImage?: string | null;
  published: boolean;
  featured: boolean;
  tags?: string[];
  authorId?: string | null;
  author?: { name: string | null; email: string } | null;
}

interface PostFormProps {
  post?: Post;
  isEditing?: boolean;
  authors: Array<{ id: string; name?: string | null; email: string }>;
}

export function PostForm({ post, isEditing = false, authors }: PostFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isCoverUploading, setIsCoverUploading] = useState(false);
  const [isCoverDragActive, setIsCoverDragActive] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const coverFileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Post>({
    title: post?.title || "",
    slug: post?.slug || "",
    content: post?.content || "",
    excerpt: post?.excerpt || "",
    coverImage: post?.coverImage || "",
    published: post?.published || false,
    featured: post?.featured || false,
    tags: post?.tags || [],
    authorId: post?.authorId ?? null,
  });

  const coverPreviewSrc = (() => {
    const src = formData.coverImage ?? "";
    if (!src) return "";
    if (src.startsWith("http")) return src;
    if (typeof window !== "undefined") return `${window.location.origin}${src}`;
    return src;
  })();

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !(formData.tags ?? []).includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags ?? []), tagInput.trim()]
      }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: (prev.tags ?? []).filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent, asDraft = false) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const safeSlug = (formData.slug || "").trim() || generateSlug(formData.title);
      const submitData = {
        ...formData,
        slug: safeSlug,
        published: asDraft ? false : formData.published
      };

      const url = isEditing ? `/api/admin/posts/${post?.id}` : "/api/admin/posts";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(isEditing ? "Post updated successfully" : "Post created successfully");
        router.push("/admin/posts");
      } else {
        const error = await response.json();
        toast.error(error.message || error.error || "Failed to save post");
      }
    } catch (error) {
      toast.error("An error occurred while saving the post");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCoverUpload = async (file: File) => {
    setIsCoverUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setFormData((prev) => ({ ...prev, coverImage: result.url }));
        toast.success("Cover image uploaded");
      } else {
        toast.error(result?.message || result?.error || "Failed to upload cover image");
      }
    } catch (error) {
      toast.error("An error occurred while uploading the cover image");
    } finally {
      setIsCoverUploading(false);
    }
  };

  const triggerCoverUpload = () => {
    coverFileInputRef.current?.click();
  };

  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleCoverUpload(file);
    }
  };

  const handleCoverDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsCoverDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleCoverUpload(file);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Content</CardTitle>
              <CardDescription>
                The main content and details of your post
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter post title..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="post-url-slug"
                  required
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt ?? ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Brief description of the post..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="content">Content</Label>
                <div className="mt-2">
                  <TiptapEditor
                    content={formData.content}
                    onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                    placeholder="Write your post content here..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publish Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Author</Label>
                <Select
                  value={formData.authorId ?? "none"}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      authorId: value === "none" ? null : value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select author" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No author</SelectItem>
                    {authors.map((author) => (
                      <SelectItem key={author.id} value={author.id}>
                        {author.name || author.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="published">Published</Label>
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, published: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="featured">Featured</Label>
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, featured: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="coverImage">Image URL</Label>
                  <Input
                    id="coverImage"
                    value={formData.coverImage ?? ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button type="button" variant="outline" onClick={triggerCoverUpload} disabled={isCoverUploading}>
                    {isCoverUploading ? "Uploading..." : "Upload from device"}
                  </Button>
                  {formData.coverImage ? (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setFormData(prev => ({ ...prev, coverImage: "" }))}
                    >
                      Remove
                    </Button>
                  ) : null}
                </div>
                <div
                  className={`border-2 border-dashed rounded-md p-4 text-sm transition-colors ${
                    isCoverDragActive ? "border-blue-500 bg-blue-50" : "border-gray-200"
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsCoverDragActive(true);
                  }}
                  onDragLeave={() => setIsCoverDragActive(false)}
                  onDrop={handleCoverDrop}
                >
                  {formData.coverImage ? (
                    <div className="border rounded-md overflow-hidden">
                      <img
                        src={coverPreviewSrc}
                        alt="Cover preview"
                        className="w-full h-40 object-cover"
                      />
                    </div>
                  ) : (
                    <div className="text-center text-gray-500">
                      Drag & drop an image here, or use “Upload from device”
                    </div>
                  )}
                </div>
                <input
                  ref={coverFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCoverFileChange}
                  className="hidden"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex space-x-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag..."
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} size="sm">
                  Add
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {(formData.tags ?? []).map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? "Saving..." : isEditing ? "Update Post" : "Create Post"}
            </Button>
            
            <Button 
              type="button"
              variant="outline" 
              className="w-full"
              onClick={(e) => handleSubmit(e, true)}
              disabled={isLoading}
            >
              Save as Draft
            </Button>
            
            <Button 
              type="button"
              variant="ghost" 
              className="w-full"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
