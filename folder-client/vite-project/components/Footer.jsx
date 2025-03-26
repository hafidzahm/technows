import { Link } from "react-router"
export default function Footer() {
    return(
        <footer className="bg-white rounded-lg shadow-sm m-4">
  <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
    <span className="text-sm text-gray-600 sm:text-center">
      © 2025{" "}
      <Link to="https://github.com/hafidzahm" className="hover:underline">
      TechNows™
        </Link>
      <span>. All Rights Reserved, featuring Summarize with AI powered by Google Gemini  </span>
      <Link to="https://ai.google.dev/gemini-api/docs/quickstart?hl=id&lang=node" className="hover:underline">
      model-2.0-flash.
      </Link>
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-600">
      <li>
        <Link to="https://github.com/NicolaDeastra/The-Lazy-Media-api" className="hover:underline me-4 md:me-6">
        Source API by The Lazy Monkey API (Unofficial)
        </Link>
      </li>
    </ul>
  </div>
</footer>

    )
}