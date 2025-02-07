import bundleAnalyzer from "@next/bundle-analyzer"

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		appDir: true
	},
	rewrites() {
		return [
			{
				source: "/file/raw/:id",
				destination: `/api/raw/:id`
			}
		]
	},
	images: {
		domains: ["avatars.githubusercontent.com"]
	},
	env: {
		NEXT_PUBLIC_DRIFT_URL: process.env.DRIFT_URL
	}
}

export default bundleAnalyzer({ enabled: process.env.ANALYZE === "true" })(
	nextConfig
)
