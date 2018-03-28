# Некоторые функции доступные в [болванке](https://git2.altarix.org/imposition/shablonizator) по умолчанию

## Шаблон `content-image`

<table style="width: 100%;">
    <tr>
        <td style="width: 1000px; text-align: center;"><b>Исходный код</b></td>
        <td style="width: 1000px; text-align: center;"><b>Результат</b></td>
    </tr>
    <tr style="width: 100%;">
        <td style="width: 50%;">
            <pre style="margin-bottom: 0;"><code>&#x3C;content-image /&#x3E;</code></pre>
        </td>
        <td style="width: 50%;">
            <pre style="margin-bottom: 0;"><code>&#x3C;image_block rel=&#x22;image&#x22;&#x3E;
    &#x3C;img url=&#x22;Data/images/17-1.png&#x22;/&#x3E;
&#x3C;/image_block&#x3E;</code></pre>
        </td>
    </tr>
    <tr style="width: 100%;">
        <td style="width: 50%;">
            <pre style="margin-bottom: 0;"><code>&#x3C;content-image&#x3E;Description&#x3C;/content-image&#x3E;</code></pre>
        </td>
        <td style="width: 50%;">
            <pre style="margin-bottom: 0;"><code>&#x3C;image_block rel=&#x22;image&#x22;&#x3E;
    &#x3C;img url=&#x22;Data/images/17-1.png&#x22;/&#x3E;
    &#x3C;p&#x3E;Description&#x3C;/p&#x3E;
&#x3C;/image_block&#x3E;</code></pre>
        </td>
    </tr>
</table>

## Шаблон `list` в связке с `list-item`

<table style="width: 100%;">
    <tr>
        <td style="width: 1000px; text-align: center;"><b>Исходный код</b></td>
        <td style="width: 1000px; text-align: center;"><b>Результат</b></td>
    </tr>
    <tr style="width: 100%;">
        <td style="width: 50%;">
            <pre style="margin-bottom: 0;"><code>&#x3C;list&#x3E;
    &#x3C;list-item&#x3E;First&#x3C;/list-item&#x3E;
    &#x3C;list-item&#x3E;Second&#x3C;/list-item&#x3E;
    &#x3C;list-item&#x3E;Third&#x3C;/list-item&#x3E;
&#x3C;/list&#x3E;</code></pre>
        </td>
        <td style="width: 50%;">
            <pre style="margin-bottom: 0;"><code>&#x3C;table border-style=&#x22;none&#x22; cellspacing=&#x22;0&#x22; margin_bottom=&#x22;0&#x22;&#x3E;
    &#x3C;tr&#x3E;
        &#x3C;td text-valign=&#x22;top&#x22;&#x3E;&#x3C;nobr&#x3E;1&#x3C;/nobr&#x3E;&#x3C;/td&#x3E;
        &#x3C;td&#x3E;First&#x3C;/td&#x3E;
    &#x3C;/tr&#x3E;
    &#x3C;tr&#x3E;
        &#x3C;td text-valign=&#x22;top&#x22;&#x3E;&#x3C;nobr&#x3E;2&#x3C;/nobr&#x3E;&#x3C;/td&#x3E;
        &#x3C;td&#x3E;Second&#x3C;/td&#x3E;
    &#x3C;/tr&#x3E;
    &#x3C;tr&#x3E;
        &#x3C;td text-valign=&#x22;top&#x22;&#x3E;&#x3C;nobr&#x3E;3&#x3C;/nobr&#x3E;&#x3C;/td&#x3E;
        &#x3C;td&#x3E;Third&#x3C;/td&#x3E;
    &#x3C;/tr&#x3E;
&#x3C;/table&#x3E;</code></pre>
        </td>
    </tr>
    <tr style="width: 100%;">
        <td style="width: 50%;">
            <pre style="margin-bottom: 0;"><code>&#x3C;list start-index=&#x22;17&#x22;&#x3E;
    &#x3C;list-item&#x3E;First&#x3C;/list-item&#x3E;
    &#x3C;list-item&#x3E;Second&#x3C;/list-item&#x3E;
    &#x3C;list-item&#x3E;Third&#x3C;/list-item&#x3E;
&#x3C;/list&#x3E;</code></pre>
        </td>
        <td style="width: 50%;">
            <pre style="margin-bottom: 0;"><code>&#x3C;table border-style=&#x22;none&#x22; cellspacing=&#x22;0&#x22; margin_bottom=&#x22;0&#x22;&#x3E;
    &#x3C;tr&#x3E;
        &#x3C;td text-valign=&#x22;top&#x22;&#x3E;&#x3C;nobr&#x3E;17&#x3C;/nobr&#x3E;&#x3C;/td&#x3E;
        &#x3C;td&#x3E;First&#x3C;/td&#x3E;
    &#x3C;/tr&#x3E;
    &#x3C;tr&#x3E;
        &#x3C;td text-valign=&#x22;top&#x22;&#x3E;&#x3C;nobr&#x3E;18&#x3C;/nobr&#x3E;&#x3C;/td&#x3E;
        &#x3C;td&#x3E;Second&#x3C;/td&#x3E;
    &#x3C;/tr&#x3E;
    &#x3C;tr&#x3E;
        &#x3C;td text-valign=&#x22;top&#x22;&#x3E;&#x3C;nobr&#x3E;19&#x3C;/nobr&#x3E;&#x3C;/td&#x3E;
        &#x3C;td&#x3E;Third&#x3C;/td&#x3E;
    &#x3C;/tr&#x3E;
&#x3C;/table&#x3E;</code></pre>
        </td>
    </tr>
    <tr style="width: 100%;">
        <td style="width: 50%;">
            <pre style="margin-bottom: 0;"><code>&#x3C;list list-style-symbols=&#x22;A B C&#x22;&#x3E;
    &#x3C;list-item&#x3E;First&#x3C;/list-item&#x3E;
    &#x3C;list-item&#x3E;Second&#x3C;/list-item&#x3E;
    &#x3C;list-item&#x3E;Third&#x3C;/list-item&#x3E;
&#x3C;/list&#x3E;</code></pre>
        </td>
        <td style="width: 50%;">
            <pre style="margin-bottom: 0;"><code>&#x3C;table border-style=&#x22;none&#x22; cellspacing=&#x22;0&#x22; margin_bottom=&#x22;0&#x22;&#x3E;
    &#x3C;tr&#x3E;
        &#x3C;td text-valign=&#x22;top&#x22;&#x3E;&#x3C;nobr&#x3E;A&#x3C;/nobr&#x3E;&#x3C;/td&#x3E;
        &#x3C;td&#x3E;First&#x3C;/td&#x3E;
    &#x3C;/tr&#x3E;
    &#x3C;tr&#x3E;
        &#x3C;td text-valign=&#x22;top&#x22;&#x3E;&#x3C;nobr&#x3E;B&#x3C;/nobr&#x3E;&#x3C;/td&#x3E;
        &#x3C;td&#x3E;Second&#x3C;/td&#x3E;
    &#x3C;/tr&#x3E;
    &#x3C;tr&#x3E;
        &#x3C;td text-valign=&#x22;top&#x22;&#x3E;&#x3C;nobr&#x3E;C&#x3C;/nobr&#x3E;&#x3C;/td&#x3E;
        &#x3C;td&#x3E;Third&#x3C;/td&#x3E;
    &#x3C;/tr&#x3E;
&#x3C;/table&#x3E;</code></pre>
        </td>
    </tr>
</table>
<table style="width: 100%;">
    <tr>
        <td style="width: 1000px; text-align: center;"><b>Исходный код</b></td>
    </tr>
        <tr style="width: 100%;">
            <td style="width: 100%;">
                <pre style="margin-bottom: 0;"><code>&#x3C;list list-style-pattern=&#x22;&#x3C;some_block some-attribute=&#x27;value&#x27;&#x3E;${i}&#x3C;/some_block&#x3E;&#x22;&#x3E;
    &#x3C;list-item&#x3E;First&#x3C;/list-item&#x3E;
    &#x3C;list-item&#x3E;Second&#x3C;/list-item&#x3E;
    &#x3C;list-item&#x3E;Third&#x3C;/list-item&#x3E;
&#x3C;/list&#x3E;</code></pre>
            </td>
        </tr>
    <tr>
        <td style="width: 1000px; text-align: center;"><b>Результат</b></td>
    </tr>
        <tr style="width: 100%;">
            <td style="width: 100%;">
                <pre style="margin-bottom: 0;"><code>&#x3C;table border-style=&#x22;none&#x22; cellspacing=&#x22;0&#x22; margin_bottom=&#x22;0&#x22;&#x3E;
    &#x3C;tr&#x3E;
        &#x3C;td text-valign=&#x22;top&#x22;&#x3E;&#x3C;nobr&#x3E;&#x3C;some_block some-attribute=&#x22;value&#x22;&#x3E;1&#x3C;/some_block&#x3E;&#x3C;/nobr&#x3E;&#x3C;/td&#x3E;
        &#x3C;td&#x3E;First&#x3C;/td&#x3E;
    &#x3C;/tr&#x3E;
    &#x3C;tr&#x3E;
        &#x3C;td text-valign=&#x22;top&#x22;&#x3E;&#x3C;nobr&#x3E;&#x3C;some_block some-attribute=&#x22;value&#x22;&#x3E;2&#x3C;/some_block&#x3E;&#x3C;/nobr&#x3E;&#x3C;/td&#x3E;
        &#x3C;td&#x3E;Second&#x3C;/td&#x3E;
    &#x3C;/tr&#x3E;
    &#x3C;tr&#x3E;
        &#x3C;td text-valign=&#x22;top&#x22;&#x3E;&#x3C;nobr&#x3E;&#x3C;some_block some-attribute=&#x22;value&#x22;&#x3E;3&#x3C;/some_block&#x3E;&#x3C;/nobr&#x3E;&#x3C;/td&#x3E;
        &#x3C;td&#x3E;Third&#x3C;/td&#x3E;
    &#x3C;/tr&#x3E;
&#x3C;/table&#x3E;</code></pre>
            </td>
        </tr>
</table>

## Шаблон `list` в связке с `content-image` (или любым другим `image_block`'ом)

<table style="width: 100%;">
    <tr>
        <td style="width: 1000px; text-align: center;"><b>Исходный код</b></td>
        <td style="width: 1000px; text-align: center;"><b>Результат</b></td>
    </tr>
    <tr style="width: 100%;">
        <td style="width: 50%;">
            <pre style="margin-bottom: 0;"><code>&#x3C;equal-height-images&#x3E;
    &#x3C;content-image/&#x3E;
    &#x3C;content-image/&#x3E;
&#x3C;/equal-height-images&#x3E;</code></pre>
        </td>
        <td style="width: 50%;">
            <pre style="margin-bottom: 0;"><code>&#x3C;table cellspacing=&#x22;0&#x22; width=&#x22;100%&#x22; border-style=&#x22;none&#x22;&#x3E;
    &#x3C;tr&#x3E;
        &#x3C;td text-valign=&#x22;center&#x22; width=&#x22;36.7380%&#x22;&#x3E;
            &#x3C;image_block&#x3E;
                &#x3C;img url=&#x22;Data/images/16-1.jpg&#x22; /&#x3E;
            &#x3C;/image_block&#x3E;
        &#x3C;/td&#x3E;
        &#x3C;td width=&#x22;5%&#x22; /&#x3E;
        &#x3C;td text-valign=&#x22;center&#x22; width=&#x22;58.2620%&#x22;&#x3E;
            &#x3C;image_block&#x3E;
                &#x3C;img url=&#x22;Data/images/16-2.jpg&#x22; /&#x3E;
            &#x3C;/image_block&#x3E;
        &#x3C;/td&#x3E;
    &#x3C;/tr&#x3E;
&#x3C;/table&#x3E;</code></pre>
        </td>
    </tr>
    <tr style="width: 100%;">
        <td style="width: 50%;">
            <pre style="margin-bottom: 0;"><code>&#x3C;equal-height-images space="10"&#x3E;
    &#x3C;content-image/&#x3E;
    &#x3C;content-image/&#x3E;
&#x3C;/equal-height-images&#x3E;</code></pre>
        </td>
        <td style="width: 50%;">
            <pre style="margin-bottom: 0;"><code>&#x3C;table cellspacing=&#x22;0&#x22; width=&#x22;100%&#x22; border-style=&#x22;none&#x22;&#x3E;
    &#x3C;tr&#x3E;
        &#x3C;td text-valign=&#x22;center&#x22; width=&#x22;34.8044%&#x22;&#x3E;
            &#x3C;image_block&#x3E;
                &#x3C;img url=&#x22;Data/images/16-1.jpg&#x22; /&#x3E;
            &#x3C;/image_block&#x3E;
        &#x3C;/td&#x3E;
        &#x3C;td width=&#x22;10%&#x22; /&#x3E;
        &#x3C;td text-valign=&#x22;center&#x22; width=&#x22;55.1956%&#x22;&#x3E;
            &#x3C;image_block&#x3E;
                &#x3C;img url=&#x22;Data/images/16-2.jpg&#x22; /&#x3E;
            &#x3C;/image_block&#x3E;
        &#x3C;/td&#x3E;
    &#x3C;/tr&#x3E;
&#x3C;/table&#x3E;</code></pre>
        </td>
    </tr>
</table>
<br>



---


Также текстовые теги из `style_common.xml` автоматически записываются в `configs/config.cfg:textTags`


