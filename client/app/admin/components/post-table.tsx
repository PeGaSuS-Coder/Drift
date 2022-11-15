'use client';
import SettingsGroup from "@components/settings-group"
import { Fieldset, useToasts } from "@geist-ui/core/dist"
import byteToMB from "@lib/byte-to-mb"
import {  PostWithFiles } from "@lib/server/prisma";
import Table from "rc-table"
import {  useMemo } from "react"
import ActionDropdown from "./action-dropdown"

const PostTable = ({ 
	  posts,
}: {
	  posts: PostWithFiles[]
}) => {
	const tablePosts = useMemo(
		() =>
			posts?.map((post) => {
				return {
					id: post.id,
					title: post.title,
					files: post.files?.length || 0,
					createdAt: `${new Date(
						post.createdAt
					).toLocaleDateString()} ${new Date(
						post.createdAt
					).toLocaleTimeString()}`,
					visibility: post.visibility,
					size: post.files
						? byteToMB(
								post.files.reduce((acc, file) => acc + file.html.length, 0)
						  )
						: 0,
					actions: ""
				}
			}),
		[posts]
	)

	const deletePost = async (/* id: string */) => {
		return alert("Not implemented")

		// const confirm = window.confirm("Are you sure you want to delete this post?")
		// if (!confirm) return
		// const res = await adminFetcher(`/posts/${id}`, {
		// 	method: "DELETE",
		// })

		// const json = await res.json()

		// if (res.status === 200) {
		// 	setToast({
		// 		text: "Post deleted",
		// 		type: "success"
		// 	})

		// 	setPosts((posts) => {
		// 		const newPosts = posts?.filter((post) => post.id !== id)
		// 		return newPosts
		// 	})
		// } else {
		// 	setToast({
		// 		text: json.error || "Something went wrong",
		// 		type: "error"
		// 	})
		// }
	}

	const tableColumns = [
		{
			title: "Title",
			dataIndex: "title",
			key: "title",
			width: 50
		},
		{
			title: "Files",
			dataIndex: "files",
			key: "files",
			width: 10
		},
		{
			title: "Created",
			dataIndex: "createdAt",
			key: "createdAt",
			width: 100
		},
		{
			title: "Visibility",
			dataIndex: "visibility",
			key: "visibility",
			width: 50
		},
		{
			title: "Size (MB)",
			dataIndex: "size",
			key: "size",
			width: 10
		},
		{
			title: "Actions",
			dataIndex: "",
			key: "actions",
			width: 50,
			render() {
				return (
					<ActionDropdown
						title="Actions"
						actions={[
							{
								title: "Delete",
								onClick: () => deletePost()
							}
						]}
					/>
				)
			}
		}
	]

	return (
		<SettingsGroup title="Posts">
			{!posts && <Fieldset.Subtitle>Loading...</Fieldset.Subtitle>}
			{posts && (
				<Fieldset.Subtitle>
					<h5>{posts.length} posts</h5>
				</Fieldset.Subtitle>
			)}
			{posts && <Table columns={tableColumns} data={tablePosts} />}
		</SettingsGroup>
	)
}

export default PostTable
