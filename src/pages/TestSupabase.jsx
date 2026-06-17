import { useEffect } from "react";
import { supabase } from "../lib/supabase";

function TestSupabase() {
  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase
        .from("profiles")
        .select("*");

      console.log(data);

      if (error) {
        console.error(error);
      }
    }

    testConnection();
  }, []);

  return <h1>Supabase Test</h1>;
}

export default TestSupabase;