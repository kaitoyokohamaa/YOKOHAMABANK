import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import Header from "components/Header";

import { Progress } from "antd";
import { v1 as uuidv1 } from "uuid";
import firebase from "config/firebase";
import data from "components/Income/data.json";
import { moneyField } from "components/Home/index";
import { useFunctions } from "hooks/useFunctions";
import debounce from "lodash/debounce";
import { useLocalStorage } from "components/Income/useLocalStorage";

export default function Index() {
  const [text, setText] = useState<string>("");

  const [type, setType] = useState<string>("inc");
  const [money, setMoney] = useState<number>(0);
  const [date, setDate] = useState(new Date());
  const [getBankID, setGetBankID] = useState<string>();
  const [open, setOpen] = useState(false);
  const [attack, setAttack] = useState<boolean>(false);
  const [blow, setBlow] = useState<boolean>(false);
  const [hp, setHp] = useLocalStorage("enemyHp", 100);
  const [incantation, setIncantation] = useState<string>("");
  const [lv, setLv] = useLocalStorage("myLv", 1);
  const [index, setIndex] = useLocalStorage("enemy", 0);
  const [comment, setComment] = useState<string>(`${data[index].name}と戦闘中`);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [functionContents] = useFunctions();
  const currentUserId = functionContents.currentUserId;
  const totalBudget = functionContents.totalBudget;
  const ref = firebase.firestore().collection("User");
  // settimeoutをpromiseチェーンを使って管理
  const wait = (timeout: number) =>
    new Promise((resolve) => setTimeout(resolve, timeout));
  // 敵の切り替え
  useEffect(() => {
    if (hp === 0 && data[index].name === "冴えないサラリーマン") {
      setIndex(index + 1);
      setLv(lv + 1);
      setHp(100);
      setComment("冴えないサラリーマンを倒した");
    } else if (hp === 0 && data[index].name === "バニーガールちゃん") {
      setIndex(index + 1);
      setLv(lv + 1);
      setHp(100);
      setComment("バニーガールちゃんを倒した");
    } else if (hp === 0 && data[index].name === "伝説の男") {
      setIndex(index + 1);
      setLv(lv + 1);
      setHp(100);
      setComment("伝説の男を倒した");
    } else if (hp === 0 && data[index].name === "女神オブ自由") {
      setIndex(index + 1);
      setLv(lv + 1);
      setHp(100);
      setComment("女神オブ自由を倒した");
    } else if (hp === 0 && data[index].name === "god") {
      setIndex(index + 1);
      setLv(lv + 1);
      setHp(100);
      setComment("godを倒した");
    } else if (hp === 0 && data[index].name === "魔女") {
      setIndex(index + 1);
      setLv(lv + 1);
      setHp(100);
      setComment("魔女を倒した");
    } else if (hp === 0 && data[index].name === "神") {
      setIndex(index + 1);
      setLv(lv + 1);
      setHp(100);
      setComment("神を倒した");
    } else if (hp === 0 && data[index].name === "女子高生") {
      setIndex(index + 1);
      setLv(lv + 1);
      setHp(100);
      setComment("女子高生を倒した");
    } else if (hp === 0 && data[index].name === "ドラゴン") {
      setIndex(index + 1);
      setLv(lv + 1);
      setHp(100);
      setComment("ドラゴンを倒した");
    }
  }, [hp]);
  // 自分のIDを識別する
  useEffect(() => {
    ref.onSnapshot((usersDocs) => {
      usersDocs.forEach((contens) => {
        if (contens.data().userID[0].includes(currentUserId)) {
          const bankID = contens.id;
          setGetBankID(bankID);
        }
      });
    });
  }, [currentUserId]);
  // ダメージの計算を行う
  useEffect(() => {
    (async () => {
      await wait(200);
      if (attack && incantation !== "") {
        setComment(incantation);
        setIncantation("");
      } else if (attack && incantation === "") {
        setComment("かいかいの攻撃！！喰らえ！21歳拳パンチ");
      } else if (blow) {
        setComment("一撃必殺！！");
      }

      await wait(600);
      if (attack && incantation !== "") {
        const attakNum = hp - 10;
        setHp(attakNum);
        setComment(`10のダメージ`);
      } else if (attack && incantation === "") {
        const attakNum = hp - 5;
        setHp(attakNum);
        setComment(`5のダメージ`);
      } else if (blow) {
        setHp(0);
        setComment(`${data[index].name}は倒れた`);
      }

      await wait(700);
      setAttack(false);
      setBlow(false);
      setComment("どうする？");
    })();
  }, [attack, blow]);
  // 収益を追加する
  const submitHandler = debounce(() => {
    if (text.trim() !== "") {
      const sendMoney: moneyField = {
        money,
        description: text,
        type,
        createdAt: firebase.firestore.Timestamp.now(),
        day: date,
        id: uuidv1(),
        category: "",
      };
      if (getBankID) {
        ref.doc(getBankID).collection("bank").add(sendMoney);
        setText("");
        setMoney(0);
        setOpen(false);
        setAttack(true);
      }
    } else {
      alert("本文が入力されてません");
    }
  }, 1000);
  // 戦いのコマンドを押したら
  const fightHandler = debounce(() => {
    setAttack(true);
  }, 1000);

  const fightBlowHandler = debounce(() => {
    setBlow(true);
  }, 1000);

  return (
    <div>
      <Header />
      <div>
        <div>
          <div>
            <ul>
              <li>名前</li>
              <li>レベル</li>
              <li>体力(残高)</li>
            </ul>
            <ul>
              <li>かいかい</li>
              <li>{lv}</li>
              <li>{totalBudget ? totalBudget : 1}</li>
            </ul>
          </div>
          <div>
            <h4>{data[index].name}</h4>
            <img src={`/Img/${data[index].img}`} />
            <Progress
              style={{
                width: "50%",
                margin: "10px",
              }}
              strokeColor={{
                "0%": "red",
                "100%": "pink",
              }}
              status="active"
              percent={hp}
            />
          </div>
          <div>
            <div>
              <p>かいかい</p>
              <ul>
                <li onClick={handleOpen}>▶︎呪文</li>
                <Modal
                  visible={open}
                  onCancel={handleClose}
                  footer={[
                    <Button
                      key="expro"
                      type="default"
                      onClick={() => {
                        setIncantation("エクスプロォォージョンッ！！");
                        submitHandler();
                      }}
                    >
                      エクスプロォォージョンッ！！
                    </Button>,
                  ]}
                >
                  <div>
                    <div>
                      <div>
                        <h1>収入を記録</h1>
                        <input
                          type="text"
                          placeholder="Add description"
                          value={text}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setText(event.target.value);
                          }}
                        />
                        <input
                          type="number"
                          placeholder="200"
                          value={money}
                          onChange={(
                            event: React.ChangeEvent<
                              HTMLTextAreaElement | HTMLInputElement
                            >
                          ) => {
                            const moneyStore: number = Number(
                              event.target.value
                            );
                            setMoney(moneyStore);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Modal>
                <li onClick={fightHandler}>戦う</li>
                <li onClick={fightBlowHandler}>一撃</li>
                <li onClick={() => setComment("逃げちゃダメだ")}>逃げる</li>
              </ul>
            </div>
            <div>
              <p>{comment}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
