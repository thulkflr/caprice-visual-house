/** @typedef {{slug:string,title:{en:string,ar:string},category:{en:string,ar:string},year:number,client:string,description:{en:string,ar:string},cover:string,gallery:string[],services:string[],credits:Record<string,string>,featured:boolean,seo:{title:string,description:string}}} Project */

/** @type {Project[]} */
export const projects = [];

export const futureSections = Object.freeze({
  team: false,
  testimonials: false,
  trustedBy: false,
  servicePages: false,
  caseStudies: false,
});
