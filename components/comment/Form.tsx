import { Button } from "../controls";
import { RefObject } from "react";

type FormProps = {
  comicId: string;
  formRef: RefObject<HTMLFormElement | null>;
  formAction: (formData: FormData) => Promise<void>;
};

export default function Form({ comicId, formRef, formAction }: FormProps) {
  return (
    <form ref={formRef} action={formAction} className="mb-6">
      <input type="hidden" name="comicId" value={comicId} />
      <textarea
        name="comment"
        placeholder="コメントを入力してください..."
        className="w-full p-3 border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        rows={3}
      />
      <div className="flex justify-between items-center mt-2">
        <Button type="submit">投稿する</Button>
      </div>
    </form>
  );
}
