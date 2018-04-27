props说明
参数        |说明                  |类型     |可选值     |默认值
-           |-                    |-        |-         |-
data        |传入组件数据 required |array    |无        |无
tagCfg      |tag配置项   required  |object   |无        |无

tagCfg说明
参数                      |说明                    |类型     |可选值             |默认值
-                         |-                       |-        |-                 |-
closable                  |是否可关闭               |boolean  |-                 |false
disable-transitions       |是否禁用渐变动画          |boolean  |-                 |false
hit                       |是否有边框描边            |boolean  |-                 |false
color                     |背景色                   |string   |-                 |-
size                      |尺寸                     |string   |medium/small/mini |-
closeCb                   |可关闭时回调，注入tag与index|function |-                 |-
class                     |tag类名                   |string  |-                 |-
props                     |数据项键名与组件映射关系    |object  |-                 |-
useTheme    |是否使用内置theme，若false,则会在tag上加`custom-tag-${type}`的类名|boolean |无        |true
disableType               |不弹出气泡的类             |string  |-                 |-


tagCfg.props说明
参数        |说明           |类型     |可选值     |默认值
-           |-              |-       |-          |-
label       |label对应键名   |string  |  无       |默认取data中的label
type        |type对应字段    |string   |无        |默认取data中的type
success     |success对应值   |string/number     |无         |默认对应'success'
info        |info对应值      |string/number     |无         |默认对应'info'
warning     |warning对应值   |string/number     |无         |默认对应'warning'
danger      |danger对应值    |string/number     |无         |默认对应'danger'


slot说明
参数        |说明          
-           |-             
content     |popover内容  若需要使用传入数据项，加上slot-scope="props" slot="content", props.item可以取到每一项
