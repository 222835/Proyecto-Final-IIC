import type { ResumeCertifications } from "lib/redux/types"; //MOD file name
import type { ResumeSectionToLines } from "lib/parse-resume-from-pdf/types";
import { deepClone } from "lib/deep-clone";
import { getSectionLinesByKeywords } from "lib/parse-resume-from-pdf/extract-resume-from-sections/lib/get-section-lines";
import { initialFeaturedSkills } from "lib/redux/resumeSlice";
import {
  getBulletPointsFromLines,
  getDescriptionsLineIdx,
} from "lib/parse-resume-from-pdf/extract-resume-from-sections/lib/bullet-points";

export const extractCertifications = (sections: ResumeSectionToLines) => { //MOD variable name
  const lines = getSectionLinesByKeywords(sections, ["certification"]); //MOD section name
  const descriptionsLineIdx = getDescriptionsLineIdx(lines) ?? 0;
  const descriptionsLines = lines.slice(descriptionsLineIdx);
  const descriptions = getBulletPointsFromLines(descriptionsLines);

  /*const featuredSkills = deepClone(initialFeaturedSkills);         // This part is unique to skills (the duplicated 
  if (descriptionsLineIdx !== 0) {                                   // file) so it is not necessary
    const featuredSkillsLines = lines.slice(0, descriptionsLineIdx);
    const featuredSkillsTextItems = featuredSkillsLines
      .flat()
      .filter((item) => item.text.trim())
      .slice(0, 6);
    for (let i = 0; i < featuredSkillsTextItems.length; i++) {
      featuredSkills[i].skill = featuredSkillsTextItems[i].text;
    }
  }*/

  const certifications: ResumeCertifications = { //MOD variable name
    //featuredSkills,  <- MOD not necessary
    descriptions,
  };

  return { certifications }; //MOD variable name
};
