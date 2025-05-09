import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
interface PaginationButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
  className?: string;
}
const PaginationButton = ({
  children,
  className,
  ...props
}: PaginationButtonProps) => {
  return (
    <Button
      className={cn("cursor-pointer disabled:cursor-not-allowed", className)}
      variant={"outline"}
      size={"sm"}
      {...props}
    >
      {children}
    </Button>
  );
};
export default PaginationButton;
