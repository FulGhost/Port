export function LoadingSpinner({ size = "h-4 w-4", color = "border-white" }) {
  return (
    <span
      className={`${size} inline-block animate-spin rounded-full border-2 ${color} border-t-transparent`}
      aria-hidden="true"
    />
  );
}
