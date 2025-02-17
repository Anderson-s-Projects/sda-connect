
import { FileText } from "lucide-react";
import { PostWithProfile } from "@/types/database";

interface PostAttachmentProps {
  post: PostWithProfile;
}

export const PostAttachment = ({ post }: PostAttachmentProps) => {
  const attachments = post.metadata?.attachments || [];

  return (
    <>
      {attachments.map((attachment, index) => {
        if (attachment.type.startsWith("image/")) {
          return (
            <div key={index} className="mt-4">
              <img
                src={attachment.url}
                alt="Post attachment"
                className="rounded-lg max-h-96 w-full object-cover"
              />
            </div>
          );
        }

        if (attachment.type.startsWith("video/")) {
          return (
            <div key={index} className="mt-4">
              <video
                src={attachment.url}
                controls
                className="rounded-lg w-full"
              />
            </div>
          );
        }

        return (
          <a
            key={index}
            href={attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center gap-2 p-4 bg-muted rounded-lg hover:bg-muted/80"
          >
            <FileText className="h-6 w-6" />
            <span>View attachment</span>
          </a>
        );
      })}
    </>
  );
};
