import UserDetailsForm from "@/components/UserDetailsForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Welcome to Artemis
        </h1>
        <UserDetailsForm />
      </div>
    </div>
  );
}
