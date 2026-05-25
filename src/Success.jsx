export default function Success() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white shadow-xl p-8 rounded-xl text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful 🎉
        </h1>

        <p>
          Thank you for your order
        </p>
      </div>
    </div>
  );
}