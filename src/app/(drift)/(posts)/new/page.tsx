import { getMetadata } from "src/app/lib/metadata"
import NewPost from "src/app/(drift)/(posts)/new/components/new"
import "./components/react-datepicker.css"

export default function New() {
	return <NewPost />
}

export const metadata = getMetadata({
	title: "New post",
	hidden: true
})
