import { useEffect, useState, type FormEvent } from "react";
import { motion } from "motion/react";

const App = () => {
  const [amount, setAmount] = useState<number>(
    localStorage.getItem("amount")
      ? Number(localStorage.getItem("amount"))
      : 500
  );
  const [duration, setDuration] = useState<number>(
    localStorage.getItem("duration")
      ? Number(localStorage.getItem("duration"))
      : 1
  );
  const [interest, setInterest] = useState<number>(
    localStorage.getItem("interest")
      ? Number(localStorage.getItem("interest"))
      : 0.25
  );

 
  const monthlyInterest = interest / 100 / 12;
  const totalMonths = duration * 12;

  const monthlyPayment =
    amount && duration && interest
      ? +(
          (amount * monthlyInterest) /
          (1 - Math.pow(monthlyInterest + 1, -totalMonths))
        ).toFixed(2)
      : 0;
  const totalPayment = (+monthlyPayment * duration * 12).toFixed(2);

  const toCommaNum = (num: number) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  useEffect(() => {
    if (Number(localStorage.getItem("amount")) !== amount) {
      localStorage.setItem("amount", amount.toString());
    }
    if (Number(localStorage.getItem("duration")) !== duration) {
      localStorage.setItem("duration", duration.toString());
    }
    if (Number(localStorage.getItem("interest")) !== interest) {
      localStorage.setItem("interest", interest.toString());
    }
  }, [amount, duration, interest]);
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.5,
      },
    },
  };
  const item = {
    hidden: {
      opacity: 0,
      x: -50,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const headerContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 1.5,
      },
    },
  };

  const headerItem = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div>
      <p className="font-semibold text-5xl md:text-6xl text-center my-6 mx-5 font-[Rakkas]">
        كم المبلغ الذي ترغب في{" "}
        <motion.span
          className="text-primary"
          variants={headerContainer}
          initial="hidden"
          animate="show"
        >
          {"إقتراضه؟".split("").map((letter, i) => (
            <motion.span variants={headerItem} key={i}>
              {letter}
            </motion.span>
          ))}
        </motion.span>
      </p>
      <div className="md:flex md:gap-4 md:mx-10 lg:mx-20 xl:mx-30 ">
        <motion.form
          className="m-5 md:m-0 md:w-1/4 flex flex-col gap-y-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.section
            variants={item}
            className="p-3 md:p-5 bg-amber-50 rounded-2xl shadow-xl hover:bg-amber-100 transition-colors duration-500"
          >
            <label htmlFor="amount" className="block text-base font-bold mb-2">
              مبلغ القرض:
            </label>
            <input
              type="range"
              id="amount"
              min={500}
              max={25000000}
              step={500}
              name="amount"
              value={amount}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                setAmount(+e.currentTarget.value)
              }
              className="w-full accent-primary rounded-full cursor-pointer "
            />
            <div className="flex justify-between mb-2 md:mb-4">
              <span className="text-sm">500 {"\u20c1"}</span>
              <span className="text-sm">25 مليون {"\u20c1"}</span>
            </div>
            <p className="text-center text-lg md:text-3xl font-semibold">
              {toCommaNum(amount)} {"\u20c1"}
            </p>
          </motion.section>
          <motion.section
            variants={item}
            className="p-3 md:p-5 bg-amber-50 rounded-2xl shadow-xl hover:bg-amber-100 transition-colors duration-500"
          >
            <label htmlFor="duration" className="block font-bold mb-2">
              مدة السداد:
            </label>
            <input
              type="range"
              id="duration"
              min={1}
              max={25}
              step={1}
              name="duration"
              value={duration}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                setDuration(+e.currentTarget.value)
              }
              className="w-full accent-primary rounded-full cursor-pointer"
            />
            <div className="flex justify-between mb-2 md:mb-4">
              <span className="text-sm">سنة واحدة</span>
              <span className="text-sm">25 سنة</span>
            </div>
            <p className="text-center text-lg md:text-3xl font-semibold">
              {duration > 2 && duration}{" "}
              {duration > 1
                ? duration == 2
                  ? "سنتين"
                  : duration < 11
                  ? "سنوات"
                  : "سنة"
                : "سنة"}
            </p>
          </motion.section>
          <motion.section
            variants={item}
            className="p-3 md:p-5 bg-amber-50 rounded-2xl shadow-xl hover:bg-amber-100 transition-colors duration-500"
          >
            <label htmlFor="interest" className="block font-bold mb-2">
              الفائدة السنوية:
            </label>
            <input
              type="range"
              min={0.25}
              max={25}
              step={0.25}
              value={interest}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                setInterest(+e.currentTarget.value)
              }
              className="w-full accent-primary rounded-full cursor-pointer"
            />
            <div className="flex justify-between mb-2 md:mb-4">
              <span className="text-sm">0.25%</span>
              <span className="text-sm">25%</span>
            </div>
            <p className="text-lg md:text-3xl font-semibold text-center">
              {interest}%
            </p>
          </motion.section>
        </motion.form>
        <motion.section
          className="p-4 md:p-0 m-5 md:m-0 md:flex-1 flex flex-col gap-y-10 items-center justify-center bg-amber-50 shadow-xl rounded-2xl text-center"
          initial={{ y: "-100vh", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div>
            <p className="font-bold text-2xl md:text-4xl mb-2">القسط الشهري</p>
            <p className="font-bold text-3xl  md:text-5xl text-primary flex justify-center items-center gap-2">
              {toCommaNum(+monthlyPayment)}{" "}
              <span className="text-2xl md:text-4xl font-semibold text-gray-600">
                {"\u20c1"}
              </span>
            </p>
          </div>
          <div>
            <p className="font-bold text-2xl md:text-4xl mb-2">
              إجمالي المبلغ المدفوع
            </p>
            <p className="font-bold text-3xl md:text-5xl text-primary flex justify-center items-center gap-2">
              {totalPayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              <span className="text-2xl md:text-4xl font-semibold text-gray-600">
                {"\u20c1"}
              </span>
            </p>
          </div>
        </motion.section>
      </div>
      <footer className="text-center text-sm mt-4 py-3 bg-amber-50 shadow-xl mx-5 md:mx-10 lg:mx-20 xl:mx-30 rounded-2xl">
        جميع الحقوق محفوظة {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default App;
