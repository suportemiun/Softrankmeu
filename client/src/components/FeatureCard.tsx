import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="text-center hover-elevate transition-all duration-200">
      <CardContent className="p-8 space-y-4">
        <div className="text-4xl mb-4" data-testid={`icon-${title.toLowerCase()}`}>
          {icon}
        </div>
        <h4 className="font-semibold text-lg" data-testid={`title-${title.toLowerCase()}`}>
          {title}
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`desc-${title.toLowerCase()}`}>
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
