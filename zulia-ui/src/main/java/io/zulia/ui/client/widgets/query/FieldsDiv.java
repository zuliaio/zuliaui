package io.zulia.ui.client.widgets.query;

import com.google.gwt.dom.client.Style;
import gwt.material.design.addins.client.autocomplete.MaterialAutoComplete;
import gwt.material.design.addins.client.autocomplete.constants.AutocompleteType;
import gwt.material.design.client.ui.MaterialCheckBox;
import gwt.material.design.client.ui.MaterialColumn;
import gwt.material.design.client.ui.MaterialRow;
import gwt.material.design.client.ui.MaterialTextBox;
import io.zulia.ui.client.bundle.MainResources;
import io.zulia.ui.client.widgets.base.FieldNameSuggest;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Payam Meyer on 4/3/17.
 * @author pmeyer
 */
public class FieldsDiv extends MaterialRow {

	public FieldsDiv(String indexName, List<String> fieldsToShowList, List<String> fieldsInUiQueryObject) {

		MaterialColumn column = new MaterialColumn(12, 12, 12);

		if (fieldsToShowList.size() > 250) {

			MaterialAutoComplete autoComplete = new MaterialAutoComplete(new FieldNameSuggest(indexName));
			autoComplete.setType(AutocompleteType.CHIP);
			autoComplete.setPlaceholder("Start typing for field names...");
			autoComplete.setAutoSuggestLimit(10);

			column.add(autoComplete);

		}
		else {
			List<MaterialCheckBox> checkBoxes = new ArrayList<>();

			MaterialCheckBox selectAllCheckBox = new MaterialCheckBox("Select All");
			selectAllCheckBox.addStyleName(MainResources.GSS.topMarginFive());
			selectAllCheckBox.addValueChangeHandler(event -> {
				for (MaterialCheckBox checkBox : checkBoxes) {
					checkBox.setValue(event.getValue());
					if (event.getValue()) {
						fieldsInUiQueryObject.add(checkBox.getText());
					}
					else {
						fieldsInUiQueryObject.remove(checkBox.getText());
					}
				}
			});
			column.add(selectAllCheckBox);

			MaterialTextBox filterTextBox = new MaterialTextBox("Start typing to filter...");
			column.add(filterTextBox);

			for (String fieldName : fieldsToShowList) {
				MaterialCheckBox checkBox = new MaterialCheckBox(fieldName);
				checkBox.addStyleName(MainResources.GSS.wordBreakAll());
				if (fieldsInUiQueryObject.contains(fieldName)) {
					checkBox.setValue(true);
				}
				checkBox.addValueChangeHandler(event -> {
					if (event.getValue()) {
						fieldsInUiQueryObject.add(checkBox.getText());
					}
					else {
						fieldsInUiQueryObject.remove(checkBox.getText());
					}

				});
				checkBoxes.add(checkBox);
				column.add(checkBox);
			}

			filterTextBox.addKeyUpHandler(keyUpEvent -> {
				for (MaterialCheckBox checkBox : checkBoxes) {
					if (!checkBox.getText().contains(filterTextBox.getValue())) {
						checkBox.setVisible(false);
					}
					else {
						checkBox.setVisible(true);
						checkBox.getElement().getStyle().setDisplay(Style.Display.BLOCK);
					}
				}

			});
		}

		add(column);
	}

}
