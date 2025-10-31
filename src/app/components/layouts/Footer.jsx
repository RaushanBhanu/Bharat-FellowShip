export default function Footer() {
  return (
    <footer className=" py-6 border-t border-gray-200 bg-gray-50">
      <div className="text-center text-gray-600 text-sm">
        <p>
          🌾 Crafted with ❤️ in <span className="font-semibold text-gray-800">Bihar</span>
        </p>
        <p className="mt-1 text-xs text-gray-400">
          © {new Date().getFullYear()} Our Voice, Our Rights — All rights reserved.
        </p>
      </div>
    </footer>
  );
}
