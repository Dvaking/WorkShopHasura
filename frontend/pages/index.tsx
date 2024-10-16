import { useEffect, useState } from "react";
import { gql } from "graphql-request";
import { client } from "./api/hello";

const GetInfo = gql`
  query {
    info {
      id
      name
      email
    }
  }
`;

interface Info {
  info: {
    id: number;
    name: string;
    email: string;
  };
}

async function getInfo() {
  let response: Info | null = null;
  try {
    response = await client.request(GetInfo);
  } catch (error) {
    console.error("Error fetching info", error);
  }
  return response;
}

export default function Home() {
  const [Info, setInfo] = useState<Info>();

  useEffect(() => {}, []);

  const OnclickAction = async () => {
    try {
      const data = await getInfo();
      if (data) setInfo(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  return (
    <div>
      <button
        className="font-[family-name:var(--font-geist-mono)] text-2xl sm:text-4xl bg-white text-black"
        onClick={OnclickAction}
      >
        Get Info
      </button>
      <div>{Info?.info.email}</div>
    </div>
  );
}
