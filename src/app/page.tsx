import Header from "../components/Header"; // 1. Import component vào

export default function Home() {
  return (
    // min-h-screen: Để trang web luôn cao ít nhất bằng màn hình
    <main className="min-h-screen flex flex-col">
      
      {/* 2. Đặt component Header vào đây */}
      <Header />
    </main>
  );
}