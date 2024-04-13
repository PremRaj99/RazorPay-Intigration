import React from "react";
import Card from "../components/Card";

export default function Home() {
  return (
      <div className="flex flex-wrap gap-10 p-10 justify-center items-center">
        <Card
          image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          price="199"
          name="Noise Fit Watch 4"
        />
        <Card
          image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          price="249"
          name="Sony Max Ultra Pro Headphone"
        />
        <Card
          image="https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          price="149"
          name="Palki Bazzar Beast Glasses"
        />
        <Card
          image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          price="499"
          name="Nike Sneakers Air 2"
        />
        <Card
          image="https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          price="99"
          name="Coconut Body Oil"
        />
      </div>
  );
}
