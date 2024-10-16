import { useEffect, useState } from "react";
import { gql } from "graphql-request";
import { client } from "./api/hello";

const GetInfo = gql`
  query MyQuery {
    info {
      email
      name
    }
  }
`;

type InfoType = {
  email: string;
  name: string;
};

interface Info {
  info: [InfoType];
}

async function getInfo() {
  let response: Info | null = null;
  try {
    response = await client.request(GetInfo);
  } catch (error) {
    console.error("Error fetching info", error);
  }
  return response ? response?.info : [];
}

export default function Home() {
  const [Info, setInfo] = useState<InfoType[]>([]);

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
      <div>
        {Info.map((info) => {
          return (
            <div key={info.email}>
              <div>{info.email}</div>
              <div>{info.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
