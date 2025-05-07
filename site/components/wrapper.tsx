import { cn } from "@/lib/utils";
interface WrapperProps {
  className?: string;
  children: React.ReactNode;
}
const Wrapper = ({ children, className }: WrapperProps) => {
  return (
    <div
      className={cn("w-[calc(100%-20px)] max-w-[1100px] mx-auto", className)}
    >
      {children}
    </div>
  );
};
export default Wrapper;
