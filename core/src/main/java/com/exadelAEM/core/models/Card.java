package com.exadelAEM.core.models;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Required;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;

import javax.annotation.PostConstruct;
import javax.inject.Inject;


@Model(adaptables={Resource.class},
        resourceType = {Card.RESOURCE_TYPE})
public class Card {

    protected static final String RESOURCE_TYPE = "exadelAEM/components/content/card";

    @Setter @Getter @Inject
    private String title;
    @Setter @Getter @Inject
    private  String link;
    @Setter @Getter @Inject
    private  String description;
    @Setter @Getter @Inject
    private String pubDate;
    @Setter @Getter @Inject
    private String guid;

    @ScriptVariable
    @Required
    private PageManager pageManager;

    /***
     * The underlying article page used to populate the card content.
     */
    private Page articlePage;

    @PostConstruct
    public void init() {

        if(StringUtils.isNotBlank(link)) {
            articlePage = pageManager.getPage(link);
        }
    }

    @Override
    public String toString() {
        return "FeedMessage [title=" + title + ", guid=" + guid + ", description=" + description
                + ", link=" + link
                + "]";
    }

    public boolean isEmpty() {
        //if the articlePage is non null then the component is not empty
        if (articlePage != null) {
            return false;
        }
        return true;
    }

}
