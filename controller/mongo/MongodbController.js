const mongoose = require("mongoose");
const logger = require("../../config/customLogger");

const EEG = require("../../model/eegModel");
const fMRI = require("../../model/fmriModel");
const moment = require("moment");

moment.tz.setDefault("Asia/Seoul");
const seoulDate = moment().format("YYYY-MM-DD HH:mm:ss");

const saveFiles = (result, resltParams) => {
  console.log(`SEOUL DATE : ${seoulDate}`);
  //   console.log(`Result ${result}`);
  let checkFileType = result.map((item) => {
    // EEG인지 체크합시다
    if (item.Key.includes("EEG")) {
      let itemKey = item.Key.split("/");
      itemKey.pop();

      // EEG 모델에 만들고 몽고디비 저장
      var eeg = new EEG();
      eeg.eegFileName = item.Key.split("/").reverse()[0];
      eeg.eegFileLocation = itemKey.join("/");
      eeg.eegFileUrl = item.Location;
      eeg.createdAtSeoul = seoulDate;
      eeg.updatedAtSeoul = seoulDate;

      eeg.save((err) => {
        if (err) {
          logger.appLogger().log({
            level: "error",
            message: err.toString(),
          });
          console.log(`err : ${err}`);
          return err;
        } else {
          logger.appLogger().log({
            level: "info",
            message: `EEG MODEL SAVED :${eeg.eegFileName}`,
          });
          console.log(`EEG MODEL SAVED ${eeg.eegFileName}`);
          return "EEG SUCCESS";
        }
      });
    } else {
      return "NOTHING";
    }
  });

  // Promise.all(checkFileType).then((result) => {
  //   console.log(`PROMISE ? ${result}`);
  //   return result;
  // });
};

// const saveFiles = (result, resultParams) => {
//   // 파일 무엇인지 구분짓는다(비정형?정형)
//   result.map((item) => {
//     // console.log(item.Key);
//     if (item.Key.includes("EEG")) {
//       let itemKey = item.Key.split("/");
//       itemKey.pop();

//       // EEG 모델에 저장
//       var eeg = new EEG();
//       eeg.eegFileName = item.Key.split("/").reverse()[0];
//       eeg.eegFileLocation = itemKey.join("/");
//       eeg.eegFileUrl = item.Location;

//       eeg.save(function (err) {
//         if (err) {
//           console.log(`EEG error :: ${err}`);
//           return;
//         }
//         console.log("EEG Success");
//       });
//     } else if (item.Key.includes("fMri")) {
//       let itemKey = item.Key.split("/");
//       itemKey.pop();

//       // fMRI 모델에 저장
//       var fMRI = new fMRI();
//       fMRI.fMriFileName = item.Key.split("/").reverse()[0];
//       fMRI.fMriFileLocation = itemKey.join("/");
//       fMRI.fMriFileUrl = item.Location;

//       fMRI.save(function (err) {
//         if (err) {
//           console.log(`fMRI error :: ${err}`);
//           return;
//         }
//         console.log("fMRI Success");
//       });
//     } else {
//       console.log("NONONO");
//     }
//   });
// };

const saveMongo = (result, author, location) => {
  // console.log(`?? item ${item}`);
  if (result != null) {
    console.log("Here?");
    result.map((item) => {
      console.log(`item key : ${item.Key}`);
      // EEG 인지 체크합니다.
      if (item.Key.toString().includes("EEG")) {
        let itemKey = item.Key.split("/");
        itemKey.pop();

        // EEG 모델에 만들고 몽고디비 저장
        var eeg = new EEG();
        eeg.eegFileName = item.Key.split("/").reverse()[0];
        eeg.eegFileLocation = itemKey.join("/");
        eeg.eegFileUrl = item.Location;
        eeg.eegAuthor = author;
        eeg.createdAtSeoul = seoulDate;
        eeg.updatedAtSeoul = seoulDate;

        eeg.save((err) => {
          if (err) {
            logger.appLogger().log({
              level: "error",
              message: `EEG Model err ` + err.toString(),
            });
            console.log(`EEG Model err : ${err}`);
            return err;
          } else {
            logger.appLogger().log({
              level: "info",
              message: `EEG MODEL SAVED :${eeg.eegFileName}`,
            });
            console.log(`EEG MODEL SAVED ${eeg.eegFileName}`);
            return "EEG SUCCESS";
          }
        });

        return true;
      } else if (item.Key.toString().includes("fMri")) {
        let itemKey = item.Key.split("/");
        itemKey.pop();

        //  fMri 모델에 만들고 몽고디비 저장
        var fMri = new fMRI();
        fMri.fMriFileName = item.Key.split("/").reverse()[0];
        fMri.fMriFileLocation = itemKey.join("/");
        fMri.fMriFileUrl = item.Location;
        fMri.fMriAuthor = author;
        fMri.createdAtSeoul = seoulDate;
        fMri.updatedAtSeoul = seoulDate;
        fMri.save((err) => {
          if (err) {
            logger.appLogger().log({
              level: "error",
              message: `fMRI Model err ` + err.toString(),
            });
            console.log(`fMRI Model err : ${err}`);
            return err;
          } else {
            logger.appLogger().log({
              level: "info",
              message: `fMRI MODEL SAVED :${item.Key.split("/").reverse()[0]}`,
            });
            console.log(`fMRI MODEL SAVED ${item.Key.split("/").reverse()[0]}`);
            return "fMRI SUCCESS";
          }
        });
      }
    });

    return true;
  } else if (item.Key.toString().indexOf("모바일")) {
    console.log(`모바일 ${item.Key}`);
    let itemKey = item.Key.split("/");
  } else {
    console.log("NOT HERE");
    return false;
  }
};

module.exports = {
  saveFiles,
  saveMongo,
};
