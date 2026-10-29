import { Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = "Memuat..." }: LoadingScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full p-8">
      <div className="relative">
        <Loader2 className="w-10 h-10 text-[#0066FF] animate-spin" />
      </div>
      <p className="mt-4 text-slate-600 font-medium text-sm tracking-wide">{message}</p>
    </div>
  );
}
