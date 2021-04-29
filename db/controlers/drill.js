const { body, param, validationResult } = require("express-validator");
const fs = require("fs");
const drill = require("../models/drill.js");
var dotenv = require("dotenv");

const Drill = {
  async createDrill(req, res) {
    console.log("*** drill.js - create function **");

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      titleFr,
      titleEng,
      descriptionFr,
      descriptionEng,
      picture,
      skills,
      fullIce,
      version,
    } = req.body;
    console.log("*** drill.js - bfore createDrill **");
    var newDrill = new drill.Drills();
    var result = await newDrill.createDrill(
      titleFr,
      titleEng,
      descriptionFr,
      descriptionEng,
      picture,
      skills,
      fullIce,
      version
    );
    if (result.length == 0) {
      return res.status(400).json({ errors: "Unable to create new drill" });
    }
    console.log("*** drill.js - before SaveToFile **");
    saveToFile(titleFr, req.body);
    res.status(200).json(result[0]);
  },

  validate(method) {
    switch (method) {
      case "createDrill": {
        return [
          body("titleFr", "titleFr is mandatory").exists(),
          body("titleEng", "titleEng is mandatory").exists(),
          body("descriptionFr", "descriptionFr is mandatory").exists(),
          body("descriptionEng", "descriptionEng is mandatory").exists(),
          body("picture", "picture is mandatory").exists(),
          body("skills", "skills is mandatory").exists(),
        ];
      }
      case "search": {
        return [true];
      }
    }
  },

  async getDrillsUrl(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    var modDrill = new drill.Drills();
    var drills = await modDrill.getAllDrillsId();
    if (drills.length == 0) {
      return res.status(400).json({ errors: "Unable to create new drill" });
    }

    res.status(200).json({ drills });
  },

  async searchDrill(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //extract parameters : allow search on Type and Ring dimension
    var drill_skills = req.query["skills"];
    var drill_fullIce = req.query["fullice"];
    var query = "1=1",
      params1,
      parmas2 = "";
    //query sql filter
    if (drill_skills != null) {
      params1 = "drill_skills in (" + quoteSkills(drill_skills) + ")";
      query = params1;
    }
    if (drill_fullIce != null) {
      parmas2 = "drill_full_ice = " + drill_fullIce;
      if (params1 != null) {
        query += " AND " + parmas2;
      } else {
        query = parmas2;
      }
    }

    var filterDrills = new drill.Drills();
    var drills = await filterDrills.searchDrills(query);
    if (drills.length == 0) {
      return res.status(400).json({ errors: "No drill found" });
    }

    console.log(req.query);
    res.status(200).json({ drills });
  },
};
//input a skill list coma separated ('Sk)
//output a skill list with single quote
function quoteSkills(skillList) {
  var lst = skillList.split(",");
  var quotedList = "";
  for (var i = 0; i <= lst.length - 1; i++) {
    quotedList += "'" + lst[i] + "'";
    if (i < lst.length - 1) {
      quotedList += ",";
    }
  }

  return quotedList;
}

function saveToFile(title, req) {
  dotenv.config();

  title = process.env.FOLDER_SAVE + title + Date.now() + ".json";
  title = title.replace(/\s+/g, "");
  let data = JSON.stringify(req, null, 1);
  fs.writeFileSync(title, data);
}

module.exports = {
  Drill,
};
