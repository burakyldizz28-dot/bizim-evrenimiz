// data/demo.ts
// MVP-1: Tüm demo içerik buradan okunur.

export const demoConfig = {
  siteTitle: "Bizim Evrenimiz",
  partnerName: "Elif",
  gatePassword: "yildizlar2015",
  welcomeText:
    "Bu evren herkese kapalı. Çünkü içindeki her yıldız, sadece bizim hikâyemizden bir parça taşıyor.",
  tagline: "Her anımız bir yıldıza dönüştü.",
};

export const demoConstellations = [
  {
    slug: "baslangic-yildizi",
    title: "Başlangıç Yıldızı",
    shortText: "Her şey bir bakışla başladı.",
    longText: `O gün hava bulutluydu ama sen gelince her şey değişti. Seni ilk gördüğümde zamanın nasıl yavaşladığını hissettim. Sanki evren o anı kaydetmek için bir nefes verdi.\n\nBaşlangıçlar her zaman sıradan görünür. Ama seninle olan başlangıcım, benim için en özel yıldızı yaktı. O yıldız hâlâ parlıyor.`,
    coverGradient: "from-indigo-900 via-slate-900 to-blue-950",
    icon: "✦",
    orderIndex: 1,
  },
  {
    slug: "gulush-takimyildizi",
    title: "Gülüş Takımyıldızı",
    shortText: "Seninle gülerken dünya duruyor.",
    longText: `Gülerken gözlerinin nasıl parladığını hiç unutmadım. O kahkahalar, o anlık neşe — bunlar benim için evrenin en güzel sesi.\n\nBazı anlar fotoğrafa sığmaz. Ama sana gülerken hissettiğim şey, içimde saklı duruyor. Hep saklı kalacak.`,
    coverGradient: "from-amber-950 via-slate-900 to-indigo-950",
    icon: "◈",
    orderIndex: 2,
  },
  {
    slug: "evlilik-galaksisi",
    title: "Evlilik Galaksisi",
    shortText: "Seninle bir galaksi kurduk.",
    longText: `O gün sadece bir tören değildi. İki ayrı yıldızın birleşip kendi galaksisini oluşturduğu andı.\n\nO günden bu yana her sabah aynı çatı altında uyanmak, sıradan gibi görünse de aslında bir mucize. Seninle olan her sıradan an, benim için olağanüstü.`,
    coverGradient: "from-slate-900 via-purple-950 to-slate-900",
    icon: "⬡",
    orderIndex: 3,
  },
  {
    slug: "evimizin-sessiz-isiklari",
    title: "Evimizin Sessiz Işıkları",
    shortText: "Sessizliğimizde bile bir dil var.",
    longText: `Bazen en güçlü anlar sessiz geçer. Sabah kahvemizi içerken söylemediğimiz ama hissettiklerimiz. Geceleri aynı battaniyenin altında iki ayrı kitap okurken duyduğumuz o sıcaklık.\n\nEvimizin köşeleri bizim hikâyemizle dolu. Her oda, ayrı bir anıyı taşıyor.`,
    coverGradient: "from-slate-900 via-teal-950 to-slate-900",
    icon: "◎",
    orderIndex: 4,
  },
  {
    slug: "sana-yazdigim-yildiz",
    title: "Sana Yazdığım Yıldız",
    shortText: "Sana söylemek istediğim her şey.",
    longText: `Sana yazmak, her zaman hem çok kolay hem çok zor gelmiştir. Kolay, çünkü seninle ilgili söylenecek çok şey var. Zor, çünkü hiçbir kelime tam olarak hissettiklerimi karşılamıyor.

Seninle geçirdiğim her yıl, öncekinden daha derin bir iz bıraktı içimde. Büyük anlar değil aslında — o sıradan sabahlar, o yorgun akşamlar, o gülüştüğümüz anlamsız şeyler...

Seni sevmek; güneşli bir günde pencereden dışarı bakmak gibi. Alışkın olursun ama güzelliği hiç eksilmez.

Bu yıl dönümünde sana söylemek istediğim şey şu: Seninle geçen her an, benim için bir yıldıza dönüştü. Ve bu evren, sadece senin için var.

Seni seviyorum.`,
    coverGradient: "from-rose-950 via-slate-900 to-indigo-950",
    icon: "✉",
    orderIndex: 5,
  },
  {
    slug: "gelecek-isigi",
    title: "Gelecek Işığı",
    shortText: "Seninle her geleceğe hazırım.",
    longText: `Geçmişimiz ne kadar güzelse, geleceğimiz o kadar parlak. Seninle hayal ettiğim her şey, benim için bir yıldız gibi önümde duruyor.\n\nNereye gidersek gidelim, hangi yolu seçersek seçelim — yanında olmak, beni her zaman doğru yerde hissettiriyor.`,
    coverGradient: "from-blue-950 via-slate-900 to-emerald-950",
    icon: "◐",
    orderIndex: 6,
  },
];

export const demoLetter = {
  content: `Sana yazmak, her zaman hem çok kolay hem çok zor gelmiştir. Kolay, çünkü seninle ilgili söylenecek çok şey var. Zor, çünkü hiçbir kelime tam olarak hissettiklerimi karşılamıyor.

Seninle geçirdiğim her yıl, öncekinden daha derin bir iz bıraktı içimde. Büyük anlar değil aslında — o sıradan sabahlar, o yorgun akşamlar, o gülüştüğümüz anlamsız şeyler...

Seni sevmek; güneşli bir günde pencereden dışarı bakmak gibi. Alışkın olursun ama güzelliği hiç eksilmez.

Bu yıl dönümünde sana söylemek istediğim şey şu: Seninle geçen her an, benim için bir yıldıza dönüştü. Ve bu evren, sadece senin için var.

Seni seviyorum.`,
};

export const demoInfinityNote = {
  content: "Seninle her yer evren. Seninle her an sonsuz.",
};

export const demoPhotos = Array.from({ length: 24 }, (_, i) => ({
  id: `demo-${i + 1}`,
  url: null,
  alt: `Anı ${i + 1}`,
  constellationId: null,
}));