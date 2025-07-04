import { RentSuggestionForm } from "@/components/rent-suggestion-form";

export default function RentSuggestionPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">AI Rent Suggestion Tool</h1>
        <p className="text-muted-foreground">
          Optimize your rental income with data-driven pricing recommendations.
        </p>
      </div>
      <RentSuggestionForm />
    </div>
  );
}
