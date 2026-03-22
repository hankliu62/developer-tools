'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RedirectPage() {
  const params = useParams();
  const router = useRouter();
  const storyId = params?.id as string;

  useEffect(() => {
    if (storyId) {
      router.replace(`/tools/life/story-collection/detail?id=${storyId}`);
    }
  }, [storyId, router]);

  return null;
}
