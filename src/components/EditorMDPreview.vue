<template>
	<div id="EditorMDPreview">
		
	</div>
</template>

<script>
import scriptjs from "scriptjs";

export default {
	name: "EditorMDPreview",
	props: {
		content:{
			type: String,
			default() {
				return "";
			},
		},
		editorConfig: {
			type: Object,
			default() {
				return {
					//htmlDecode      : true,       // 开启 HTML 标签解析，为了安全性，默认不开启
					htmlDecode      : "style,script,iframe",  // you can filter tags decode
					//toc             : false,
					tocm            : true,    // Using [TOCM]
					//tocContainer    : "#custom-toc-container", // 自定义 ToC 容器层
					//gfm             : false,
					//tocDropdown     : true,
					// markdownSourceCode : true, // 是否保留 Markdown 源码，即是否删除保存源码的 Textarea 标签
					emoji           : true,
					taskList        : true,
					tex             : true,  // 默认不解析
					flowChart       : true,  // 默认不解析
					sequenceDiagram : true,  // 默认不解析
				};
			},
		},
	},
	mounted() {
        let needLoads = [
            'static/EditorMD/editormd.js',
            'static/EditorMD/lib/marked.min.js',
			'static/EditorMD/lib/prettify.min.js',
			'static/EditorMD/lib/raphael.min.js',
			'static/EditorMD/lib/underscore.min.js',
			'static/EditorMD/lib/sequence-diagram.min.js',
			'static/EditorMD/lib/flowchart.min.js',
			'static/EditorMD/lib/jquery.flowchart.min.js'
        ]
        scriptjs(needLoads, "md");
        
        scriptjs.ready('md', () => {
            this.update();
        })
	},
	destoryed() {
		
	},
	methods: {
		update(callback){
            var Vue = this;
			Vue.$nextTick((editorMD = window.editormd) => {
				if (editorMD) {
					let cfg = Vue.editorConfig;
					cfg.markdown = Vue.content;
					
					Vue.previewInstance = editorMD.markdownToHTML("EditorMDPreview", cfg);
					if(callback) callback(Vue.previewInstance);
				}
			});
		}
	}
};
</script>

<style>
@media screen and (max-width: 750px) {
    #EditorMDPreview{
        padding: 0px;
    }
}
</style>
