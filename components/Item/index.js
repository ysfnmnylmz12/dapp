import { selectItemForUpgrade } from "../../store/actions/selectItemForUpgrade";
import styles from "./Item.module.scss";
import { useContext } from "react";
import { MainContext } from "../../store";
import { selectScrollForUpgrade } from "../../store/actions/selectScrollForUpgrade";

const Item = ({ item, collectible }) => {
  const { state, dispatch } = useContext(MainContext);
  const selectHandler = (item) => {
    if (!collectible) {
      selectItemForUpgrade(dispatch, item);
    } else {
      selectScrollForUpgrade(dispatch, item.data.idList[Math.floor(Math.random() * item.data.idList.length)]);
    }
  };
  return (
    <div className={styles.item} onClick={() => selectHandler(item)}>
      <img src={`/${item.data.name}.jpg`} alt={item.data.name} />
      {collectible && <span className={styles.count}>{item.data.count}</span>}
      {!collectible && (
        <div className={styles.detail}>
          <h3 className={styles.itemName}>{`${item.data.name} (+${item.data.grade})`}</h3>
          <p>{`Attack Power : ${item.data.attack}`}</p>
          <p className={styles.magic}>{`Poison Damage : ${item.data.magicDamage}`}</p>
          <p>{`Attack Range : ${item.data.range}`}</p>
          <p>{`Attack Speed : ${item.data.speed}`}</p>
        </div>
      )}
      {collectible && (
        <div className={styles.detail}>
          <h3 className={styles.itemName}>{`${item.data.name}`}</h3>
        </div>
      )}
    </div>
  );
};

export default Item;
