export function TextUser({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%] px-5 py-3 rounded-2xl rounded-br-md text-sm leading-relaxed message-user">
        {children}
      </div>
    </div>
  );
}
