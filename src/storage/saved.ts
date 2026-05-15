import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "saved.movies.v1"; // Burada v1 ekledim ki ileride storage yapısında değişiklik yaparsam eski kayıtlar etkilenmesin. Versiyonlama gibi düşünebiliriz. Eğer yapıyı değiştirecek bir durum olursa burada v2 yaparız ve eski kayıtlar etkilenmez.

export type SavedMovie = { // Kaydedilen film için gerekli bilgileri tutan tip. Detay sayfasında göstermek istediğimiz bilgileri burada tutuyoruz ki kaydedilen filmler detay sayfasında eksik bilgi nedeniyle sorun yaşamasın.
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
};

export async function getAllSaved() { // Tüm kaydedilen filmleri AsyncStorage'dan çeken fonksiyon. Eğer bir hata olursa boş bir obje döner.
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export async function isSaved(imdbID: string) { // Bir filmin kaydedilip kaydedilmediğini kontrol eden fonksiyon. Tüm kaydedilen filmleri çekip imdbID'ye göre kontrol yapar. Eğer bir hata olursa false döner.
  const all = await getAllSaved();
  return Boolean(all[imdbID]);
}

export async function toggleSave(movie: SavedMovie) { // Bir filmi kaydetmek veya kaydı kaldırmak için kullanılan fonksiyon. Önce tüm kaydedilen filmleri çeker, sonra verilen filmin imdbID'sine göre kaydedilmiş mi kontrol eder. Eğer kaydedilmişse siler, kaydedilmemişse ekler. Son olarak güncellenmiş listeyi AsyncStorage'a kaydeder. Fonksiyonun sonunda filmin şu an kaydedilmiş olup olmadığını boolean olarak döner.
  const all = await getAllSaved();
  let nowSaved: boolean;

  if (all[movie.imdbID]) {  // 
    delete all[movie.imdbID]; // Eğer film zaten kaydedilmişse, kaydı siler.
    nowSaved = false;
  } else {
    all[movie.imdbID] = movie; // Eğer film kaydedilmemişse, kaydı ekler.
    nowSaved = true;
  }

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(all)); 
  // Güncellenmiş kaydedilen filmler listesini AsyncStorage'a kaydeder. Eğer bir hata olursa bu işlem başarısız olabilir, ancak burada hatayı yakalayıp yönetmiyoruz. İleride isterseniz buraya try-catch ekleyebilirsiniz.

  return nowSaved;
}
