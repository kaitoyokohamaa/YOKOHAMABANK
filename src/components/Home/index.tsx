import React, { FC } from "react";

import { Form } from "./form";

import Header from "components/Header";
import { Tabel } from "./tabel";
import { useFunctions } from "hooks/useFunctions";
import Graph from "components/Graph";
import firebase from "config/firebase";
export interface moneyField {
  money: number;
  description: string;
  type: string;
  createdAt: firebase.firestore.FieldValue;
  day: any;
  id: string;
  category: string;
}

export const Homes: FC = () => {
  const [functionsHome] = useFunctions();

  return (
    <React.Fragment>
      <Header />
      <div>
        <div>
          <div>
            <Graph />
          </div>
        </div>
        {/* 画面半分の収入/支出のテーブルを作成 */}
        <div>
          <Form />
        </div>
        <Tabel budget={functionsHome.budget} />
      </div>
    </React.Fragment>
  );
};
