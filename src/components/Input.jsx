export default function Input({ label, type, value, onChange, required }) {
return (
<div className="mb-4">
<label className="block font-semibold mb-1">{label}</label>
<input
type={type}
value={value}
required={required}
onChange={(e) => onChange(e.target.value)}
className="w-full p-2 border rounded focus:outline-blue-500"
/>
</div>
);
}