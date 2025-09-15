interface StepCardProps {
  number: number;
  title: string;
  description: string;
}

export default function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="text-center space-y-4">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-foreground text-xl font-bold text-foreground">
        {number}
      </div>
      <h5 className="font-semibold text-lg" data-testid={`step-title-${number}`}>
        {title}
      </h5>
      <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`step-desc-${number}`}>
        {description}
      </p>
    </div>
  );
}