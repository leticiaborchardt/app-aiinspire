"use client"

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';
import Swal from 'sweetalert2';

const MyProfile = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${session?.user.id}/posts`);
			const data = await response.json();

			setPosts(data);
		}

		if (session?.user.id) {
			fetchPosts();
		}
	}, []);

	const handleEdit = (post) => {
		router.push(`update-prompt?id=${post._id}`)
	}

	const handleDelete = async (post) => {
		Swal.fire({
			text: 'Are you sure you want to delete this prompt?',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			denyButtonText: `Cancel`,
		}).then((result) => {
			if (result.isConfirmed) {
				try {
					fetch(`/api/prompt/${post._id.toString()}`, {
						method: 'DELETE'
					});

					const filteredPosts = posts.filter((p) => p._id !== post._id)
					setPosts(filteredPosts);

					Swal.fire({
						toast: true,
						position: 'top-end',
						text: 'Post deleted with success!',
						icon: 'success',
						showConfirmButton: false,
						timer: 1700
					});
				} catch (error) {
					Swal.fire({
						text: 'Something went wrong while processing your request.',
						icon: 'error'
					}).then(() => {
						location.reload();
					});
				}
			}
		})
	}

	return (
		<Profile
			name='My'
			desc='Welcome to your personalized profile page'
			data={posts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	)
}

export default MyProfile 