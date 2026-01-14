import React from 'react';
import { cn } from '@/lib/utils';

export const Card = ({ children, className, style }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) => (
    <div
        className={cn("bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden", className)}
        style={style}
    >
        {children}
    </div>
);

export const LabelStatus = ({ label, value, icon: Icon, color }: any) => (
    <div className="flex flex-col gap-2">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">{label}</span>
        <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border-2 border-transparent hover:border-slate-200 transition-all group">
            <div className="p-2.5 rounded-xl bg-white shadow-sm group-hover:scale-110 transition-transform" style={{ color }}>
                <Icon size={18} />
            </div>
            <span className="font-black text-slate-700 text-sm tracking-tight">{value}</span>
        </div>
    </div>
);

export const Badge = ({ children, variant = 'default', className }: any) => {
    const variants: any = {
        default: "bg-slate-100 text-slate-600",
        success: "bg-green-100 text-green-700",
        warning: "bg-orange-100 text-orange-700",
        danger: "bg-red-100 text-red-700",
        info: "bg-blue-100 text-blue-700",
    };

    return (
        <span className={cn("px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider", variants[variant], className)}>
            {children}
        </span>
    );
};

export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string }>(
    ({ className, variant = 'primary', ...props }, ref) => {
        const variants: any = {
            primary: "bg-slate-900 text-white hover:bg-black",
            outline: "bg-white border-2 border-slate-100 text-slate-600 hover:border-slate-200",
            ghost: "bg-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50"
        };

        return (
            <button
                ref={ref}
                className={cn(
                    "px-6 py-4 rounded-[1.5rem] font-black text-[10px] tracking-widest uppercase transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
                    variants[variant],
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";
