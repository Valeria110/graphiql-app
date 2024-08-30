import styles from './HomeBtn.module.scss';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

interface HomeBtnProps {
  handleCLick: () => void;
}

export default function HomeBtn({ handleCLick }: HomeBtnProps) {
  return (
    <button onClick={handleCLick} className={styles.homeBtn}>
      <HomeRoundedIcon sx={{ fontSize: 30 }} />
    </button>
  );
}
