package io.zulia.ui.client.charting.options;

import com.google.gwt.core.client.JavaScriptObject;
import io.zulia.ui.client.charting.handlers.DrilldownClickHandler;

public class ChartEventsOptions extends JavaScriptObject {

	public static ChartEventsOptions create() {
		return createObject().cast();
	}

	protected ChartEventsOptions() {
	}

	public final native ChartEventsOptions setDrillDown(DrilldownClickHandler drillDown) /*-{
        this.drilldown = function (e) {
            return drillDown.@io.zulia.ui.client.charting.handlers.DrilldownClickHandler::drillDown(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)(e.point.name, e.point.drilldown, e.point.code);
        };
        return this;
    }-*/;

}