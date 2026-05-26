export function TextAi({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] px-5 py-3 rounded-2xl rounded-bl-md text-sm leading-relaxed message-ai">
        {children}
      </div>
    </div>
  );
}
