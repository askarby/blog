(self.webpackChunkblog=self.webpackChunkblog||[]).push([[34],{6034:(t,e,n)=>{"use strict";n.r(e),n.d(e,{HomeModule:()=>x});var o=n(1116),i=n(1612),r=n(2168),s=n(9996),c=function(t){return t[t.ASC=0]="ASC",t[t.DESC=1]="DESC",t}({});class a{constructor(t){this.array=t,this.sortingBy=[]}by(t,e=c.ASC){const n={property:t,order:e};if(-1!==this.sortingBy.findIndex(e=>e.property===t))throw new Error("SortingUtility :: Unable to sort by same property twice");return this.sortingBy.push(n),this}apply(){return[...this.array].sort((t,e)=>{let n=0;for(let o=0;o<this.sortingBy.length&&0===n;o++){const{property:i,order:r}=this.sortingBy[o];n=this.compare(t[i],e[i],r)}return n})}compare(t,e,n){const o=t=>![null,void 0].includes(t);let i=0;if(o(t)&&o(e))if("string"==typeof t&&"string"==typeof e)i=t.localeCompare(e);else if("number"==typeof t&&"number"==typeof e)i=t-e;else{if(!(t instanceof Date&&e instanceof Date))throw new Error(`Unable to sort upon properties of types: ${typeof t} and ${typeof e}`);i=t.getTime()-e.getTime()}else{if(t===e)return 0;o(t)?o(e)||(i=-1):i=1}return i*(n===c.DESC?-1:1)}}var l=n(3769),g=n(7368),p=n(5913),u=n(5959),m=n(8318),h=n(8277);const d=new(n(1098).v)(h.o);var f=n(8470);function b(t){const{subscriber:e,counter:n,period:o}=t;e.next(n),this.schedule({subscriber:e,counter:n+1,period:o},o)}var P=n(5416);function _(t,e){if(1&t){const t=g.EpF();g.TgZ(0,"li",2),g.NdJ("click",function(){const e=g.CHM(t).$implicit,n=g.oxw();return n.currentPost=e,n.startTimer()}),g._UZ(1,"img",3),g.qZA()}if(2&t){const t=e.$implicit,n=e.index,o=g.oxw();g.ekj("selected",o.currentPost===t),g.xp6(1),g.Q6J("alt","Thumbnail #"+n)("src",t.thumbnail,g.LSH)}}function C(t,e){if(1&t&&(g.TgZ(0,"article",4),g._UZ(1,"img",5),g.TgZ(2,"div",6),g.TgZ(3,"h1"),g._uU(4),g.qZA(),g.TgZ(5,"p"),g._uU(6),g.qZA(),g.qZA(),g.qZA()),2&t){const t=e.ngIf;g.Q6J("routerLink",t.route),g.xp6(1),g.Q6J("src",t.image,g.LSH),g.xp6(3),g.Oqu(t.title),g.xp6(2),g.Oqu(t.description)}}let O=(()=>{class t{constructor(t){this.changeDetector=t,this.currentPost=null,this.destroy$=new u.xQ}ngOnChanges(t){const{posts:e}=t;(null==e?void 0:e.currentValue)&&(this.currentPost=e.currentValue[0],this.startTimer())}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}startTimer(){this.destroy$.next(),function(t=0,e=d){var n;return((0,f.k)(n=t)||!(n-parseFloat(n)+1>=0)||t<0)&&(t=0),e&&"function"==typeof e.schedule||(e=d),new m.y(n=>(n.add(e.schedule(b,t,{subscriber:n,counter:0,period:t})),n))}(this.timeBetween).pipe((0,P.R)(this.destroy$)).subscribe(()=>this.selectNextPost())}selectNextPost(){if(this.posts){let t=(this.currentPost?this.posts.indexOf(this.currentPost):-1)+1;t>=this.posts.length&&(t=0),this.currentPost=this.posts[t],this.changeDetector.detectChanges()}}}return t.\u0275fac=function(e){return new(e||t)(g.Y36(g.sBO))},t.\u0275cmp=g.Xpm({type:t,selectors:[["app-new-posts"]],inputs:{posts:"posts",timeBetween:"timeBetween"},features:[g.TTD],decls:3,vars:2,consts:[[3,"selected","click",4,"ngFor","ngForOf"],[3,"routerLink",4,"ngIf"],[3,"click"],[3,"alt","src"],[3,"routerLink"],["alt","Post image",3,"src"],[1,"info"]],template:function(t,e){1&t&&(g.TgZ(0,"ul"),g.YNc(1,_,2,4,"li",0),g.qZA(),g.YNc(2,C,7,4,"article",1)),2&t&&(g.xp6(1),g.Q6J("ngForOf",e.posts),g.xp6(1),g.Q6J("ngIf",e.currentPost))},directives:[o.sg,o.O5,i.rH],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;grid-gap:.5rem;gap:.5rem}@media screen and (min-width:768px){[_nghost-%COMP%]{flex-direction:row}}ul[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-gap:.5rem;gap:.5rem}@media screen and (min-width:768px){ul[_ngcontent-%COMP%]{display:flex;flex-direction:column}}ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:100%;cursor:pointer}ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:not(.selected)   img[_ngcontent-%COMP%]{filter:grayscale(1)}article[_ngcontent-%COMP%]{position:relative;cursor:pointer;margin-bottom:1.5rem;color:#000}article[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{display:block;max-width:100%}article[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]{position:absolute;left:0;right:0;bottom:0;padding:.5rem;border-top:1px solid #f2f2f2;background-color:#ffffffb3;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px)}article[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:2rem;line-height:2.5rem}@media screen and (min-width:768px){article[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:3rem;line-height:3.75rem}}article[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:1.2rem;line-height:1.75rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"],changeDetection:0}),t})();const w=[{path:"",component:(()=>{class t{constructor(t,e){this.scully=t,this.environment=e,this.newestPosts$=t.available$.pipe((0,r.c)(),(0,s.U)(t=>{return(e=t,new a(e)).by("published_date",c.DESC).apply();var e}),(0,s.U)(t=>t.slice(0,e.frontPage.numberOfNewestPosts)))}}return t.\u0275fac=function(e){return new(e||t)(g.Y36(p.sG),g.Y36(l.b7))},t.\u0275cmp=g.Xpm({type:t,selectors:[["app-home"]],decls:29,vars:5,consts:[[1,"new-posts"],["routerLink","/blog"],[3,"posts","timeBetween"],[1,"about-the-blog"]],template:function(t,e){1&t&&(g.TgZ(0,"section",0),g.TgZ(1,"header"),g.TgZ(2,"h1"),g._uU(3),g.qZA(),g.TgZ(4,"a",1),g._uU(5,"All posts..."),g.qZA(),g.qZA(),g._UZ(6,"app-new-posts",2),g.ALo(7,"async"),g.qZA(),g.TgZ(8,"section",3),g.TgZ(9,"h1"),g._uU(10,"A blog about"),g.qZA(),g.TgZ(11,"p"),g._uU(12," This blog is about software development, technical subjects and related topics in the same area. The topics to be covered can be, but are not limited to: "),g.qZA(),g.TgZ(13,"ul"),g.TgZ(14,"li"),g._uU(15,"Angular"),g.qZA(),g.TgZ(16,"li"),g._uU(17,"Java"),g.qZA(),g.TgZ(18,"li"),g._uU(19,"Web development (in general, such as HTML, CSS etc.)"),g.qZA(),g.TgZ(20,"li"),g._uU(21,"Interesting libraries and technologies"),g.qZA(),g.TgZ(22,"li"),g._uU(23,"Software utilities (useful for development)"),g.qZA(),g.qZA(),g.TgZ(24,"p"),g._uU(25," You can read my posts by clicking upon one of the images above, or go to the "),g.TgZ(26,"a",1),g._uU(27,"blog listing"),g.qZA(),g._uU(28,"-page. "),g.qZA(),g.qZA()),2&t&&(g.xp6(3),g.hij(" ",e.environment.frontPage.numberOfNewestPosts," newest blog posts... "),g.xp6(3),g.Q6J("posts",g.lcZ(7,3,e.newestPosts$))("timeBetween",e.environment.frontPage.timeBetweenPostChange))},directives:[i.yS,O],pipes:[o.Ov],styles:[".new-posts[_ngcontent-%COMP%]{display:block;width:100%;padding:.5rem;margin-bottom:1rem;background-image:url(/assets/images/blog-hero-image.jpeg);background-size:cover;background-position:50%}@media screen and (min-width:768px){.new-posts[_ngcontent-%COMP%]{padding:2rem 0;margin-bottom:2rem}}.new-posts[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-between;align-items:baseline;color:#fff;text-shadow:-1px 0 #000,0 1px #000,1px 0 #000,0 -1px #000}.new-posts[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus, .new-posts[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:visited{display:inline-block;color:#fff}.about-the-blog[_ngcontent-%COMP%], app-new-posts[_ngcontent-%COMP%], header[_ngcontent-%COMP%]{max-width:40rem;margin:0 auto}@media screen and (min-width:1024px){.about-the-blog[_ngcontent-%COMP%], app-new-posts[_ngcontent-%COMP%], header[_ngcontent-%COMP%]{max-width:55rem}}.about-the-blog[_ngcontent-%COMP%]{padding:.5rem .5rem 2.5rem}.about-the-blog[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{color:#3f78c9}.about-the-blog[_ngcontent-%COMP%]   li[_ngcontent-%COMP%], .about-the-blog[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:1.2rem;line-height:1.75rem}.about-the-blog[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{display:block;list-style-type:disc;padding:2rem}.about-the-blog[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] + p[_ngcontent-%COMP%]{margin-bottom:1rem}h1[_ngcontent-%COMP%]{font-size:1.5rem;line-height:2rem;margin-bottom:.5rem}@media screen and (min-width:768px){h1[_ngcontent-%COMP%]{font-size:2rem;line-height:2.5rem}}"]}),t})(),data:{licenses:[{forItem:"header image",from:"pixabay",url:"https://pixabay.com/photos/coding-computer-hacker-hacking-1841550/"}]}}];let y=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=g.oAB({type:t}),t.\u0275inj=g.cJS({imports:[[i.Bz.forChild(w)],i.Bz]}),t})();var M=n(5425);let x=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=g.oAB({type:t}),t.\u0275inj=g.cJS({imports:[[o.ez,M.m,y,p.FK]]}),t})()}}]);