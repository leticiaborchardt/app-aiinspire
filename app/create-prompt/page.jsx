"use client"

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

import Form from '@components/Form';

const CreatePrompt = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  });
  
  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user?.id
        })
      });

      if (response.ok) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          text: 'Post created with success!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1700
        });

        router.push('/');
      }
    } catch (error) {
      Swal.fire({
        text: 'Something went wrong while processing your request. Please try again later.',
        icon: 'error'
      });
    } finally {
      setSubmitting(false);
      setPost({
        prompt: '',
        tag: ''
      });
    }
  }

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt