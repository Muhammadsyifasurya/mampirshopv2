"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

const AdminDashboard = () => {
  const [salesData, setSalesData] = useState<{ [key: string]: number }>({});
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: { label: string; data: number[]; backgroundColor: string[] }[];
  } | null>(null);

  // Ambil total penjualan berdasarkan tanggal saat komponen pertama kali dimuat
  useEffect(() => {
    const totalSalesByDate = getTotalSalesByDate();
    setSalesData(totalSalesByDate);
  }, []);

  // Siapkan data chart saat salesData berubah
  useEffect(() => {
    if (Object.keys(salesData).length > 0) {
      prepareChartData(salesData);
    }
  }, [salesData]);

  // Fungsi untuk mengambil dan mengelompokkan total sales berdasarkan tanggal
  const getTotalSalesByDate = () => {
    const totalSalesByDate: { [key: string]: number } = {};

    // Ambil data user di cookies
    const allUsers = Object.keys(Cookies.get()).filter((key) =>
      key.startsWith("orderHistory_")
    );

    console.log("All Users:", allUsers);

    allUsers.forEach((userKey) => {
      const storedOrders = Cookies.get(userKey);

      if (storedOrders) {
        const orders = JSON.parse(storedOrders);
        console.log(`Orders for ${userKey}:`, orders);

        orders.forEach((order: any) => {
          const orderDate = new Date(order.date).toLocaleDateString();
          // Format: YYYY-MM-DD
          console.log(
            `Processing Order: ID ${order.id}, Date: ${orderDate}, Total: ${order.totalAmount}`
          );
          // Jika tanggal sudah ada, tambahkan totalAmount ke tanggal tersebut
          if (totalSalesByDate[orderDate]) {
            totalSalesByDate[orderDate] += order.totalAmount;
          } else {
            totalSalesByDate[orderDate] = order.totalAmount;
          }
        });
      }
    });

    console.log("Total Sales By Date:", totalSalesByDate);
    return totalSalesByDate;
  };

  const generateColorPalette = (length: number) => {
    const colors = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#FF9F40",
      "#66FF66",
      "#FF33CC",
      "#CCCC00",
      "#FF6600",
      "#00FF66",
      "#6666FF",
      "#33FF99",
      "#FF9933",
      "#66CCFF",
    ];

    return Array.from({ length }, (_, i) => colors[i % colors.length]);
  };

  // Siapkan data chart dari salesData
  const prepareChartData = (salesData: { [key: string]: number }) => {
    const labels = Object.keys(salesData).sort(); // Urutkan tanggal agar lebih rapi
    const data = labels.map((label) => salesData[label]);

    // Ambil warna untuk setiap tanggal
    const backgroundColors = generateColorPalette(labels.length);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Total Penjualan",
          data: data,
          backgroundColor: backgroundColors,
        },
      ],
    });

    console.log("Chart Data:", { labels, data }); // Debugging
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-lg my-6">
      <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
        Total Penjualan Per Tanggal
      </h2>
      <div className="w-full max-w-[500px] mt-6">
        {chartData ? (
          <Pie data={chartData} />
        ) : (
          <p className="text-lg text-gray-500 text-center">Loading chart...</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
