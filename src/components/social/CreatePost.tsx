import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon, Image, Video, FileText, PlusCircle } from "lucide-react";
import type { Post } from "@/types/database";
interface CreatePostProps {
  onPostCreated: () => void;
}
export const CreatePost = ({
  onPostCreated
}: CreatePostProps) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [postType, setPostType] = useState("text");
  const [audience, setAudience] = useState("public");
  const [scheduledDate, setScheduledDate] = useState<Date>();
  const [attachments, setAttachments] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const {
    toast
  } = useToast();
  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };
  const handleSubmit = async () => {
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter some content for your post",
        variant: "destructive"
      });
      return;
    }
    setUploading(true);
    try {
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Create the post
      const {
        data: post,
        error: postError
      } = await supabase.from("posts").insert({
        content,
        title: title || null,
        type: postType,
        user_id: user.id,
        draft: false,
        is_sabbath_appropriate: true,
        metadata: null
      }).select().single();
      if (postError) throw postError;

      // Handle attachments
      if (attachments.length > 0) {
        const uploadedAttachments = [];
        for (const file of attachments) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${post.id}/${crypto.randomUUID()}.${fileExt}`;
          const {
            error: uploadError
          } = await supabase.storage.from('post-attachments').upload(fileName, file);
          if (uploadError) throw uploadError;
          const {
            data: {
              publicUrl
            }
          } = supabase.storage.from('post-attachments').getPublicUrl(fileName);
          uploadedAttachments.push({
            type: file.type,
            url: publicUrl,
            name: file.name
          });
        }
        const {
          error: updateError
        } = await supabase.from("posts").update({
          metadata: {
            attachments: uploadedAttachments
          }
        }).eq('id', post.id);
        if (updateError) throw updateError;
      }
      toast({
        title: "Success",
        description: "Post created successfully"
      });

      // Reset form
      setContent("");
      setTitle("");
      setPostType("text");
      setAudience("public");
      setScheduledDate(undefined);
      setAttachments([]);
      onPostCreated();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };
  return <Card className="p-2 space-y-4 my-0 mx-0 px-[21px] py-[18px]">
      <Input placeholder="Title (optional)" value={title} onChange={e => setTitle(e.target.value)} />
      
      <Textarea placeholder="What's on your mind?" value={content} onChange={e => setContent(e.target.value)} className="min-h-[100px]" />

      <div className="flex gap-4">
        <Select value={postType} onValueChange={setPostType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Post type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="document">Document</SelectItem>
          </SelectContent>
        </Select>

        <Select value={audience} onValueChange={setAudience}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Audience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="public">Public</SelectItem>
            <SelectItem value="connections">Connections Only</SelectItem>
            <SelectItem value="private">Private</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              <CalendarIcon className="h-4 w-4" />
              {scheduledDate ? format(scheduledDate, "PPP") : "Schedule"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={scheduledDate} onSelect={setScheduledDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex gap-2">
        <input type="file" id="file-upload" className="hidden" onChange={handleAttachmentChange} multiple />
        <label htmlFor="file-upload">
          <Button variant="outline" className="gap-2" asChild>
            <span>
              <PlusCircle className="h-4 w-4" />
              Add Attachments
            </span>
          </Button>
        </label>
      </div>

      {attachments.length > 0 && <div className="flex gap-2 flex-wrap">
          {attachments.map((file, index) => <div key={index} className="flex items-center gap-2 bg-muted p-2 rounded">
              {file.type.startsWith('image/') && <Image className="h-4 w-4" />}
              {file.type.startsWith('video/') && <Video className="h-4 w-4" />}
              {file.type.startsWith('application/') && <FileText className="h-4 w-4" />}
              <span className="text-sm">{file.name}</span>
            </div>)}
        </div>}

      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={uploading}>
          {uploading ? "Creating Post..." : "Create Post"}
        </Button>
      </div>
    </Card>;
};