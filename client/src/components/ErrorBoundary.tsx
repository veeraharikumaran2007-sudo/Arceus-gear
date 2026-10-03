import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Arceus React Boundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050811] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md p-8 rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl backdrop-blur-xl space-y-5">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <AlertTriangle size={28} />
            </div>
            <div>
              <h2 className="text-xl font-display font-black tracking-wide">
                ARCEUS TELEMETRY RECOVERY
              </h2>
              <p className="text-xs text-slate-400 mt-2">
                A non-critical UI rendering issue was isolated. Your session, cart, and orders remain safe in Firebase.
              </p>
            </div>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 mx-auto transition cursor-pointer shadow-lg shadow-blue-500/30"
            >
              <RotateCcw size={15} />
              <span>Reload Arceus Gear</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
