import * as Models from '../../common/models';
import ApexDoc from '../ApexDoc';
import { SEARCH_ICON } from '../../common/templates';

class MenuGenerator {

    public static makeScopingPanel(): string {
        // add checkboxes for registered scopes
        const checkBoxes = ApexDoc.config.scope.map(scope =>
            `<input
                type="checkbox" checked="true" id="cbx-${scope}"
                onclick="toggleScope('${scope}', this.checked);" />
            <label for="cbx-${scope}">
                ${scope === 'testmethod' ? 'testMethod' : scope === 'webservice' ? 'webService' : scope}
            </label>`
        );

        let markup = `
            <tr>
                <td class="scoping-panel">
                    Show: <input type="checkbox" checked="true" id="cbx-all" onclick="toggleAllScopes(this.checked);" />
                    <label for="cbx-all">All</label>&nbsp;&nbsp;
                    ${checkBoxes.join('&nbsp;&nbsp;')}
                </td>
            </tr>`;

        return markup;
    }

    public static makeMenu(classGroupMap: Map<string, Models.ClassGroup>, models: Map<string, Models.TopLevelModel>): string {
        const menuMarkupMap = new Map<string, string>()
            , sortedGroups = Array
                .from(classGroupMap.keys())
                .sort((a: string, b: string) =>  a.localeCompare(b));

        // 1) iterate over groups and make our top level
        // menu items, open UL. store markup in map, we
        // will create and append our LI items next.
        for (let group of sortedGroups) {
            const cg = classGroupMap.get(group);
            const groupId = group.replace(/\s+/g, "_");
            let label = '';

            if (cg && cg.contentFileName) {
                let destination = cg.contentFileName + '.html';
                label +=
                    `<a href="javascript:void(0)" title="See Class Group info"
                        onclick="goToLocation('${destination}');">${group}</a>`;
            } else {
                label += `<span>${group}</span>`;
            }

            const markup =
                `<details id="${groupId}" class="groupName">
                    <summary onclick="toggleActiveClass(this);"
                            id="header-${groupId}"
                            class="nav-header">
                    ${label}
                    </summary>
                    <ul>
                    <!-- menu items will be appended here -->`;

            menuMarkupMap.set(group, markup);
        }

        // 2) create our individual LI items and append
        // to their corresponding already opened UL
        for (let model of models.values()) {
            const group = model.groupName || 'Miscellaneous';

            if (model.nameLine) {
                const fileName = model.name
                    , markup =
                        `<li id="item-${fileName}" class="nav-item class ${model.scope}"
                            onclick="goToLocation('${fileName}.html');">
                            <a tabindex="1" href="javascript:void(0)">${fileName}</a>
                        </li>`;

                menuMarkupMap.set(group, menuMarkupMap.get(group) + markup);
            }
        }

        // 3) iterate over map's values and concat each menu item with the
        // opening markup, closing each UL and details tag along the way
        let markup =
            `<div id="side-bar" vertical-align="top">
                <div id="search-wrapper">
                    <span>${SEARCH_ICON}</span>
                    <input id="search-input" type="text" placeholder="Search...">
                </div>
                <ul id="search-results" class=""></ul>
                <div class="navbar">
                    <nav role="navigation">
                        <a class="nav-header" id="home" href="javascript:void(0)"
                            onclick="goToLocation('index.html');">
                            Home
                        </a>
                        ${Array.from(menuMarkupMap.values())
                            .reduce((acc, menuItem) => acc += (menuItem + '</ul></details>'), '')}
                    </nav>
                </div>
            </div>`;

        return markup;
    }
}

export default MenuGenerator;