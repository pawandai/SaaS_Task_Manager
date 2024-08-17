"use client";

import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import FormErrors from "./formErrors";

interface ImagePickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

const ImagePicker = ({ id, errors }: ImagePickerProps) => {
  const { pending } = useFormStatus();

  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImageId, setSelectedImageId] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["vpXhLgGnoj0"],
          count: 9,
        });
        if (result && result.response) {
          const fetchedImages = result.response as Array<Record<string, any>>;
          setImages(fetchedImages);
        } else {
          console.error("Failed to fetch images");
        }
      } catch (error) {
        console.error(error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading)
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-slate-700 animate-spin" />
      </div>
    );

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images?.map((image) => (
          <div
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
              pending && "opacity-50 hover:opacity-50 cursor-auto"
            )}
            key={image.id}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);
            }}
          >
            <input
              type="radio"
              id={id}
              name={id}
              className="hidden"
              checked={selectedImageId === image.id}
              disabled={pending}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            <Image
              fill
              alt="Images"
              className="object-cover rounded-sm"
              src={image.urls.thumb}
            />
            {selectedImageId === image.id && (
              <div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
            <Link
              href={image.links.html}
              target="_blank"
              className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors id={id} errors={errors} />
    </div>
  );
};

export default ImagePicker;
