package com.exadelAEM.core.models;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Required;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;


@Model( adaptables = {SlingHttpServletRequest.class},
        resourceType = {Card.RESOURCE_TYPE},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class Card {

    protected static final String RESOURCE_TYPE = "exadelAEM/components/content/card";

    @ValueMapValue
    private String articlePath;

    @ValueMapValue
    private String titleOverride;

    @ValueMapValue
    private String description;

    @ValueMapValue
    private String title;


    @ScriptVariable
    @Required
    private PageManager pageManager;

    private Page articlePage;

    @PostConstruct
    public void init() {

        if(StringUtils.isNotBlank(articlePath)) {
            articlePage = pageManager.getPage(articlePath);
        }
    }

    public String getTitle() {
        String title = null;

        if (StringUtils.isNotBlank(titleOverride)) {
            return titleOverride;
        }

        if (articlePage != null) {
            title = StringUtils.isNotBlank(articlePage.getTitle()) ? articlePage.getTitle() : articlePage.getName();
        }
        return title;
    }

    public String getLinkPath() {

        if (articlePage != null) {
            return articlePage.getPath();
        }
        return null;
    }

    public String getDescription() {
        return description;
    }

    public boolean isEmpty() {
        if (articlePage != null) {
            return false;
        }
        return true;
    }

}
